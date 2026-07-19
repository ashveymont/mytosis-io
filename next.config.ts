import type { NextConfig } from "next";

// Voice-agent demo pages need microphone access for the Vapi voice widget,
// and Vapi's WebRTC infrastructure isn't in the main site's CSP allowlist —
// so each one gets its own, more permissive header set, matched first and
// excluded from the general rule below.
const DEMO_ROUTES = ["cinnamon-demo", "cape-demo", "fort-bazaar-demo", "the-bay-demo", "jetwing-blue-demo"];

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://prod.spline.design https://unpkg.com https://va.vercel-scripts.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://prod.spline.design https://unpkg.com",
  "font-src 'self' data:",
  "connect-src 'self' https://prod.spline.design https://unpkg.com https://www.google-analytics.com https://va.vercel-scripts.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      ...DEMO_ROUTES.map((route) => ({
        source: `/${route}`,
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      })),
      {
        source: `/((?!${DEMO_ROUTES.join("|")}).*)`,
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
