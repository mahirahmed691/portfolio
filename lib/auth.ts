/**
 * Derives a session token from the admin secret using SHA-256.
 * The raw secret is never stored in the cookie — only this hash is.
 * Uses the Web Crypto API so it works in both Node.js and Edge runtimes.
 */
export async function getSessionToken(secret: string): Promise<string> {
  const data = new TextEncoder().encode(secret);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
