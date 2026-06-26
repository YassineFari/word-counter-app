import { NextRequest, NextResponse } from "next/server";

const PHP_API = "http://localhost/php-auth/api/reset-password.php";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const php = await fetch(PHP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await php.json();
  return NextResponse.json(data, { status: php.status });
}
