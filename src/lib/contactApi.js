const unavailableMessage =
  "We couldn't send your enquiry. Please try again or email Info@gbhgroup.ae.";

export async function submitContact(
  payload,
  { baseUrl = import.meta.env?.VITE_API_URL ?? "", timeoutMs = 15000 } = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl.trim().replace(/\/+$/, "")}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.ok !== true) {
      throw new Error(
        typeof data?.error === "string" ? data.error : unavailableMessage,
      );
    }
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        "We couldn't confirm your enquiry in time. Please email Info@gbhgroup.ae or try again later.",
      );
    }
    if (error instanceof TypeError) throw new Error(unavailableMessage);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
