export async function GET() {
  const body = `Contact: mailto:av@blackcrestscaling.com
Expires: 2027-07-08T00:00:00.000Z
Preferred-Languages: en
Canonical: https://www.mytosis.io/.well-known/security.txt
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
