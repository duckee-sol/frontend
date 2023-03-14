'use client';

import { useEffect } from 'react';
import { useWeb3Auth } from '../../../hooks/use-web3auth';
import { closeInAppBrowser } from '~/lib/in-app-browser';

export default function LogOut() {
  const { web3auth, provider } = useWeb3Auth();

  useEffect(() => {
    if (!web3auth) {
      return;
    }
    web3auth
      .logout()
      .then(() => closeInAppBrowser())
      .catch((err) => {
        console.error(err);
        closeInAppBrowser();
      });

    const closeTimeout = setTimeout(closeInAppBrowser, 10000);
    return () => clearTimeout(closeTimeout);
  }, [web3auth, provider]);
}
