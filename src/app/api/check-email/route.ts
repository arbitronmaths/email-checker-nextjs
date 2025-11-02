import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if(!email) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  const domain=email.split("@")[1];
  const domainRegex = /^[^\s@]+\.[^\s@]+$/;
  if(!domainRegex.test(domain)) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  return NextResponse.json({ exists: true }, { status: 200 });

}
