# TODO / Potential Improvements

*   **More Granular Error Handling**: Further differentiate error types or provide more structured error details.
*   **JWKS URI Caching**: If `jwks_uri` is used by the server for token validation (not directly by this client for signing), consider caching strategies.
*   **Support for other Grant Types**: While focused on `client_credentials`, future extensions could include other OAuth flows if needed for different SMART profiles.
*   **Request Throttling/Rate Limiting**: Implement client-side rate limiting if interacting with sensitive or rate-limited FHIR endpoints.
*   **Custom HTTP Client Configuration**: Allow passing more detailed Axios configuration (e.g., custom timeouts, proxy settings) to the `SmartClient`.