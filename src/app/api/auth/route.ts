import { NextResponse } from 'next/server';
import { SignInRequest } from '~/@types/auth';
import { firebaseAuth } from '~/firebaseAdmin';

export async function POST(request: Request) {
  const { idToken } = (await request.json()) as SignInRequest;
  const decoded = await firebaseAuth.verifyIdToken(idToken);

  return NextResponse.json({
    session: {
      address: decoded.uid,
      idToken,
    },
  });
}
