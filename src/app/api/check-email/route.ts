import { NextResponse } from "next/server";

const existingEmails = ["test@example.com", "hello@domain.com", "user@gmail.com"];

export async function POST(req: Request) {
  const { email } = await req.json();

  const exists = existingEmails.includes(email);

  if (exists) {
    return NextResponse.json({ exists: true });
  } else {
    return NextResponse.json({ exists: false });
  }
}
