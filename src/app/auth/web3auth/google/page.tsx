'use client';

import { CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from '@web3auth/base';
import { Web3AuthCore } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';
import RPC from '~/solanaRPC';

const clientId = 'BLnVV-OBD-mLsoO3bmjkZ1JSxeQCk6BxDwdGn2OxU8ydUGxMYue9AZrisCKD50yXxlo2au5YcSoE4m2t01QmyKs';

export default function App() {
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      const web3auth = new Web3AuthCore({
        clientId,
        web3AuthNetwork: 'testnet', // mainnet, aqua, celeste, cyan or testnet
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: '0x2', // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: 'https://rpc.ankr.com/solana', // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });
      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: 'none', // Pass on the mfa level of your choice: default, optional, mandatory, none
        },
        adapterSettings: {},
      });
      web3auth.configureAdapter(openloginAdapter);

      setWeb3auth(web3auth);

      await web3auth.init();
      setProvider(web3auth.provider);
      console.log('Init finished');

      const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        mfaLevel: 'none', // Pass on the mfa level of your choice: default, optional, mandatory, none
        loginProvider: 'google', // Pass on the login provider of your choice: google, facebook, discord, twitch, twitter, github, linkedin, apple, etc.
      });
      setProvider(web3authProvider);
    };
    init().catch(console.error);
  }, []);

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  return (
    <div className="container">
      <div className="grid">
        {!!provider && (
          <>
            <div className="flex-container">
              <div>
                <button onClick={getUserInfo} className="card">
                  Get User Info
                </button>
              </div>
              <div>
                <button onClick={authenticateUser} className="card">
                  Get ID Token
                </button>
              </div>
              <div>
                <button onClick={getAccounts} className="card">
                  Get Account
                </button>
              </div>
              <div>
                <button onClick={getBalance} className="card">
                  Get Balance
                </button>
              </div>
              <div>
                <button onClick={sendTransaction} className="card">
                  Send Transaction
                </button>
              </div>
              <div>
                <button onClick={signMessage} className="card">
                  Sign Message
                </button>
              </div>
              <div>
                <button onClick={getPrivateKey} className="card">
                  Get Private Key
                </button>
              </div>
              <div>
                <button onClick={logout} className="card">
                  Log Out
                </button>
              </div>
            </div>

            <div id="console" style={{ whiteSpace: 'pre-line' }}>
              <p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
