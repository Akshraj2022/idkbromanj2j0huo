import { NextResponse } from 'next/server';
import { getInterestCount, incrementInterestCount } from '@/lib/counter';

export async function GET() {
  const count = await getInterestCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await incrementInterestCount();
  return NextResponse.json({ count, success: true });
}
