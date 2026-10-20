<?php
// Contact endpoint for PHP hosting (e.g. Hostinger), where the Node API in
// server/ cannot run. Mirrors server/app.js and sends through SMTP.
// Credentials live in contact-config.php next to this file (not in git).

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const UNAVAILABLE = "We couldn't send your enquiry. Please try again or email Info@gbhgroup.ae.";
// Keep in sync with src/features/home/components/Contact/contactFormConfig.js.
const TIMEFRAMES = ['Within 10 days', 'Within 10–15 days', 'Within 15–25 days'];

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean($value, int $max): string
{
    return is_string($value) ? mb_substr(trim($value), 0, $max, 'UTF-8') : '';
}

class SmtpClient
{
    /** @var resource */
    private $socket;

    public function __construct(string $host, int $port, int $timeout = 10)
    {
        $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
        $target = ($port === 465 ? 'ssl://' : 'tcp://') . $host . ':' . $port;
        $socket = @stream_socket_client($target, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
        if (!$socket) throw new RuntimeException("SMTP connect failed: $errstr ($errno)");
        stream_set_timeout($socket, $timeout);
        $this->socket = $socket;
        $this->expect(220);
        $this->hello();
        if ($port !== 465) {
            $this->command('STARTTLS', 220);
            if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP STARTTLS failed');
            }
            $this->hello();
        }
    }

    private function hello(): void
    {
        $this->command('EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), 250);
    }

    private function expect(int $code): string
    {
        $response = '';
        while (($line = fgets($this->socket, 1024)) !== false) {
            $response .= $line;
            // Multi-line replies use "250-"; the final line uses "250 ".
            if (strlen($line) < 4 || $line[3] !== '-') break;
        }
        if ((int) substr($response, 0, 3) !== $code) {
            throw new RuntimeException('SMTP error: ' . trim($response ?: 'no response'));
        }
        return $response;
    }

    public function command(string $command, int $code): string
    {
        fwrite($this->socket, $command . "\r\n");
        return $this->expect($code);
    }

    public function login(string $user, string $pass): void
    {
        $this->command('AUTH LOGIN', 334);
        $this->command(base64_encode($user), 334);
        $this->command(base64_encode($pass), 235);
    }

    public function send(string $from, array $to, string $data): void
    {
        $this->command("MAIL FROM:<$from>", 250);
        foreach ($to as $recipient) $this->command("RCPT TO:<$recipient>", 250);
        $this->command('DATA', 354);
        // Body parts are base64, so no line can start with "." and need stuffing.
        $this->command($data . "\r\n.", 250);
        $this->command('QUIT', 221);
    }
}

function header_text(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function address_of(string $mailbox): string
{
    return preg_match('/<([^>]+)>/', $mailbox, $m) ? trim($m[1]) : trim($mailbox);
}

function build_message(string $from, array $to, ?string $replyTo, string $subject, string $text, string $html): string
{
    $boundary = 'b' . bin2hex(random_bytes(12));
    $fromName = trim(preg_replace('/<[^>]*>/', '', $from), " \"");
    $fromAddress = address_of($from);
    $domain = substr(strrchr($fromAddress, '@') ?: '@localhost', 1);
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . ($fromName !== '' ? header_text($fromName) . " <$fromAddress>" : $fromAddress),
        'To: ' . implode(', ', $to),
        'Subject: ' . header_text($subject),
        'Message-ID: <' . bin2hex(random_bytes(16)) . "@$domain>",
        'MIME-Version: 1.0',
        "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    ];
    if ($replyTo) array_splice($headers, 3, 0, ["Reply-To: $replyTo"]);
    $part = fn (string $type, string $body) => "--$boundary\r\nContent-Type: $type; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n" . rtrim(chunk_split(base64_encode($body))) . "\r\n";
    return implode("\r\n", $headers) . "\r\n\r\n"
        . $part('text/plain', $text) . $part('text/html', $html) . "--$boundary--";
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20 * 1024 + 1);
if (strlen((string) $raw) > 20 * 1024) {
    respond(413, ['error' => 'Your enquiry is too long. Please shorten your message.']);
}
$body = json_decode((string) $raw, true);
if (!is_array($body)) {
    respond(400, ['error' => 'Invalid enquiry. Please check your details and try again.']);
}

// Honeypot: real users never fill the hidden "website" field.
if (!empty($body['website'])) respond(200, ['ok' => true]);

$form = [
    'name' => clean($body['name'] ?? null, 120),
    'email' => clean($body['email'] ?? null, 200),
    'phone' => clean($body['phone'] ?? null, 40),
    'timeframe' => clean($body['timeframe'] ?? null, 40),
    'message' => clean($body['message'] ?? null, 5000),
];

// Email is optional, but must be valid when given.
if ($form['name'] === '' || $form['phone'] === ''
    || ($form['email'] !== '' && !filter_var($form['email'], FILTER_VALIDATE_EMAIL))) {
    respond(400, ['error' => 'Please fill in all required fields.']);
}
if (!in_array($form['timeframe'], TIMEFRAMES, true)) {
    respond(400, ['error' => 'Please select a timeframe.']);
}

$configFile = __DIR__ . '/contact-config.php';
$config = is_file($configFile) ? require $configFile : null;
if (!is_array($config) || empty($config['smtp_host']) || empty($config['smtp_user']) || empty($config['smtp_pass'])) {
    error_log('Contact enquiry delivery failed: api/contact-config.php is missing or incomplete.');
    respond(502, ['error' => UNAVAILABLE]);
}

$rows = [
    ['Full name', $form['name']],
    ['Email address', $form['email'] !== '' ? $form['email'] : '—'],
    ['Mobile number', $form['phone']],
    ['Planned start', $form['timeframe']],
    ['Message', $form['message'] !== '' ? $form['message'] : '—'],
];
$text = implode("\n", array_map(fn ($row) => "$row[0]: $row[1]", $rows));
$html = '<table cellpadding="6">' . implode('', array_map(
    fn ($row) => '<tr><td valign="top"><strong>' . $row[0] . '</strong></td><td style="white-space:pre-wrap">'
        . htmlspecialchars($row[1], ENT_QUOTES, 'UTF-8') . '</td></tr>',
    $rows,
)) . '</table>';

$from = $config['mail_from'] ?? $config['smtp_user'];
$to = array_values(array_filter(array_map('trim', explode(',', $config['contact_to'] ?? $config['smtp_user']))));
// Strip line breaks so visitor input can never add mail headers.
$subject = 'GBH website enquiry from ' . str_replace(["\r", "\n"], ' ', $form['name']);

try {
    $smtp = new SmtpClient(rtrim(trim($config['smtp_host']), '/'), (int) ($config['smtp_port'] ?? 465));
    $smtp->login(trim($config['smtp_user']), $config['smtp_pass']);
    $smtp->send(address_of($from), $to, build_message($from, $to, $form['email'] ?: null, $subject, $text, $html));
} catch (Throwable $error) {
    error_log('Contact enquiry delivery failed: ' . $error->getMessage());
    respond(502, ['error' => UNAVAILABLE]);
}

respond(200, ['ok' => true]);
