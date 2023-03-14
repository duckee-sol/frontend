import { app } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';
import { SignInRequest } from '~/@types/auth';
import { initializeFirebaseOnce } from '~/firebaseAdmin';

export async function POST(request: Request) {
  const { idToken } = (await request.json()) as SignInRequest;
  await initializeFirebaseOnce();
  const decoded = await getAuth(app()).verifyIdToken(idToken);

  return NextResponse.json({
    session: {
      address: decoded.uid,
      idToken,
    },
  });
}
