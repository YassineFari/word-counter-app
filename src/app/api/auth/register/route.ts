import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PHP_API = "http://localhost/php-auth/api/register.php";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const php = await fetch(PHP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await php.json();
  const res = NextResponse.json(data, { status: php.status });

  if (data.success) {
    const c = await cookies();
    c.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 86400 * 7,
    });
  }

  return res;
}
