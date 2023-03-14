'use client';

import { useEffect } from 'react';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import RPC from '../../solanaRPC';
import './web3auth-custom.css';

export default function App() {
  const { web3auth, provider } = useWeb3Auth();

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
        const rpc = new RPC(provider);
        const idToken = await web3auth.authenticateUser();
        const address = await rpc.getAccounts();

        const dataBackToMobile = JSON.stringify({
          idToken,
          address,
        });
        document.location = `duckee://auth_result?data=${encodeURIComponent(dataBackToMobile)}`;
      })();
      return;
    }
    web3auth.connect().catch(console.error);
  }, [web3auth, provider]);

  // TODO: spinner?
  return <></>;
}
