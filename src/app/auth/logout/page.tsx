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
    if (web3auth && provider) {
      alert('not logged in.');
      return closeInAppBrowser();
    }
    web3auth
      .logout()
      .then(() => closeInAppBrowser())
      .catch((err) => {
        console.error(err);
        closeInAppBrowser();
      });
  }, [web3auth, provider]);
}
