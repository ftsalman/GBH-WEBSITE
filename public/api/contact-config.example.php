<?php
// Copy to contact-config.php (same folder) and fill in the mailbox password.
// contact-config.php is git-ignored; upload it to the server's api/ folder.
return [
    'mail_from' => 'GBH Website <info@gbhgroup.ae>',
    'contact_to' => 'info@gbhgroup.ae', // comma-separated for several recipients
    'smtp_host' => 'premium312.web-hosting.com',
    'smtp_port' => 465,
    'smtp_user' => 'info@gbhgroup.ae',
    'smtp_pass' => '',
];
