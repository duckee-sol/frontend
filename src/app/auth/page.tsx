'use client';

import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import { closeInAppBrowser, returnToAppWithData } from '~/lib/in-app-browser';
import RPC from '../../solanaRPC';
import './web3auth-custom.css';

export default function App() {
  const { web3auth, provider } = useWeb3Auth();
  const [isModalShown, setModalShown] = useState(false);

  const handleAfterLogin = useCallback(async (web3auth: Web3Auth, provider: SafeEventEmitterProvider) => {
    const { idToken } = await web3auth.authenticateUser();
    console.log('ID Token: ' + idToken);

    const rpc = new RPC(provider);
    const addresses = await rpc.getAccounts();

    console.log(`[${addresses.join(', ')}] addresses found. Returning back to app`);
    returnToAppWithData('auth_result', {
      idToken,
      address: addresses[0],
    });
  }, []);

  useEffect(() => {
    if (!web3auth) {
      return;
    }
    if (web3auth && provider) {
      // handle after login
      handleAfterLogin(web3auth, provider).catch(console.error);
      return;
    }
    if (!isModalShown) {
      setModalShown(true);
      web3auth
        .connect()
        .then(async (provider) => {
          if (!provider) {
            closeInAppBrowser();
            return;
          }
          await handleAfterLogin(web3auth, provider);
        })
        .catch(console.error);
    }
  }, [web3auth, isModalShown, provider]);

  // TODO: spinner?
  return <></>;
}
