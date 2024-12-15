import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NASA_API_KEY is not set" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch APOD data" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
