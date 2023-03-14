import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';

const clientId = 'BLnVV-OBD-mLsoO3bmjkZ1JSxeQCk6BxDwdGn2OxU8ydUGxMYue9AZrisCKD50yXxlo2au5YcSoE4m2t01QmyKs';

async function initWeb3Auth() {
  const web3auth = new Web3Auth({
    clientId,
    uiConfig: {
      appName: 'Duckee',
      appLogo: '/logo.png',
      theme: 'dark',
      defaultLanguage: 'en-US',
    },
    web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
    sessionTime: 86400 * 7,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: '0x2', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      rpcTarget: 'https://rpc.ankr.com/solana', // This is the public RPC we have added, please pass on your own endpoint while creating an app
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: 'none', // Pass on the mfa level of your choice: default, optional, mandatory, none
      // redirectUrl: 'https://naver.com/',
    },
    adapterSettings: {
      // uxMode: 'redirect',
    },
  });
  web3auth.configureAdapter(openloginAdapter);

  await web3auth.initModal();
  return web3auth;
}

export const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    initWeb3Auth()
      .then((web3auth) => {
        setWeb3auth(web3auth);
        setProvider(web3auth.provider);
      })
      .catch((err) => console.error(`failed to initialize Web3Auth: ${err.stack}`));
  });

  return { web3auth, provider, setProvider };
};
