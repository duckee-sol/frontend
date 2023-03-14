'use client';

import { useEffect, useState } from 'react';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import RPC from '../../solanaRPC';
import './web3auth-custom.css';

export default function App() {
  const { web3auth, provider } = useWeb3Auth();
  const [isModalShown, setModalShown] = useState(false);

  useEffect(() => {
    if (!web3auth) {
      return;
    }
    if (web3auth && provider) {
      // handle after login
      (async () => {
        if (!provider || !web3auth) {
          return;
        }
        const { idToken } = await web3auth.authenticateUser();
        console.log('ID Token: ' + idToken);

        const rpc = new RPC(provider);
        const addresses = await rpc.getAccounts();

        console.log(`[${addresses.join(', ')}] addresses found. Returning back to app`);
        const dataBackToMobile = JSON.stringify({
          idToken,
          address: addresses[0],
        });
        document.location = `duckee://auth_result?data=${encodeURIComponent(dataBackToMobile)}`;
      })();
      return;
    }
    if (!isModalShown) {
      setModalShown(true);
      web3auth.connect().catch(console.error);
    }
  }, [web3auth, isModalShown, provider]);

  // TODO: spinner?
  return <></>;
}
