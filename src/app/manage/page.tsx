'use client';

import { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { TypographyH2, TypographyInlineCode } from '~/components/ui/typography';
import { useToast } from '~/hooks/use-toast';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import RPC from '~/solanaRPC';

export default function App() {
  const { toast } = useToast();
  const { web3auth, provider, setProvider } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    if (!web3auth || !provider) {
      return;
    }
    web3auth.getUserInfo().then((user) => setUserInfo(JSON.stringify(user, null, 2)));
  }, [web3auth, provider]);

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    toast({
      title: 'ID Token',
      description: `${idToken}`,
    });
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    toast({
      title: 'User info',
      description: JSON.stringify(user),
    });
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    toast({
      title: 'Logged out',
      description: 'You are logged out',
    });
    setProvider(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    toast({
      title: 'Accounts',
      description: `${address}`,
    });
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    toast({
      title: 'Balance',
      description: `${balance}`,
    });
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

  const buttonClass = 'w-full h-12 bg-slate-50 rounded-md text-lg font-semibold';
  return (
    <div className="container">
      {!!provider && (
        <div className="flex flex-col space-y-2">
          <TypographyH2 noBorder className="text-slate-700">
            Manage Wallet
          </TypographyH2>
          <TypographyInlineCode>{userInfo}</TypographyInlineCode>
          <Button onClick={getUserInfo} className={buttonClass}>
            Get User Info
          </Button>
          <Button onClick={authenticateUser} className={buttonClass}>
            Get ID Token
          </Button>
          <Button onClick={getAccounts} className={buttonClass}>
            Get Account
          </Button>
          <Button onClick={getBalance} className={buttonClass}>
            Get Balance
          </Button>
          <Button onClick={sendTransaction} className={buttonClass}>
            Send Transaction
          </Button>
          <Button onClick={signMessage} className={buttonClass}>
            Sign Message
          </Button>
          <Button onClick={getPrivateKey} className={buttonClass}>
            Get Private Key
          </Button>
          <Button onClick={logout} className={buttonClass}>
            Log Out
          </Button>
        </div>
      )}
      {!provider && (
        <TypographyH2 noBorder className="text-slate-700">
          Not Logged In
        </TypographyH2>
      )}
    </div>
  );
}
