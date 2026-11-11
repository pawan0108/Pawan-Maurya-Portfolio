# Apps Script contact integration

Reviewed against the user's supplied `doPost`, `response`, `doGet`, and `authorizeServices` source on 11 November 2026.

- Endpoint in `src/data/contact.json` exactly matches the URL supplied by the user; it was already configured, so no different deployment URL was invented.
- Submission: standard POST with multipart FormData fields `name`, `email`, `phone`, `message`. All four are required by the supplied script; frontend phone is now required too.
- Response: JSON `{ "success": boolean, "message": string }`. Frontend displays the server's message, resets only on `success: true`, and preserves input on false/error. HTTP 200 alone is not success. Earlier status/plain-text heuristics have been removed now that the actual contract is known.
- The supplied script writes to the active spreadsheet's `Sheet1`, sends an admin notification, then a visitor acknowledgment. Those backend actions remain in Apps Script; recipient addresses/Google credentials are not copied into client code.
- Read-only live GET returned HTTP 200 and the expected `doGet` health message. This confirms public health endpoint access, not Sheet writes, MailApp permission/quota, CORS behavior on POST, or inbox delivery.
- Native browser validation bubbles are disabled with `noValidate`. Required, email and phone errors appear in red below their fields with accessible descriptions; invalid submission focuses the first error. Errors update while correcting input.
- Sending shows a visible pending banner and disables duplicate submissions. Confirmed success opens a personalized thank-you dialog with a check icon and blurred backdrop. Server/network errors open an error dialog and retain entered details. Both dialogs support Escape, contained keyboard focus, focus restoration, small screens and reduced motion.
- No real POST/email was sent. Eight browser submission tests intercept the URL and exercise the exact JSON contract, HTTP failures, unreadable HTML responses, duplicate guard, inline validation, popup accessibility and required phone.
- To check live delivery later, an authorized user should submit through the form and inspect both the Sheet row and actual admin/visitor inboxes. `authorizeServices()` in the supplied backend can verify Sheet access and request the relevant Google permissions. A readable failure must remain a failure; do not add `no-cors` or label an opaque response successful.

The backend saves the Sheet row before sending emails. A later email error can therefore leave a saved row even when it returns `success: false`; the frontend never retries automatically. This implementation does not change the remote Apps Script deployment.
