'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { TypographyH2, TypographyP, TypographySmall } from '~/components/ui/typography';
import { Art, ArtCreation } from '~/@types/art';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import SolanaRpc from '~/solanaRPC';

interface MintTransactResponse {
  tokenMint: string;
  txId: string;
  blockExplorerUrl: string;
}

const DEFAULT_ART_JSON = `{
  "tokenId": 17,
  "description": "Van Gogh version",
  "forSale": true,
  "liked": false,
  "imageUrl": "https://static.duckee.xyz/images/3c67995c-ce8d-4701-8a03-9a82258fe136.png",
  "priceInFlow": 2,
  "royaltyFee": 10
}`;

export default function MintTransactPage() {
  const { provider } = useWeb3Auth();
  const data = useSearchParams().get('data') ?? DEFAULT_ART_JSON;
  const [address, setAddress] = useState('-');
  const { imageUrl, description, priceInFlow, royaltyFee }: ArtCreation = JSON.parse(data);

  useEffect(() => {
    if (!provider) {
      return;
    }
    const solana = new SolanaRpc(provider);
    solana.getAccounts().then((accounts) => {
      console.log(`Loaded user account: ${accounts[0]}`);
      setAddress(accounts[0]);
    });
  }, [provider]);

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex-1 relative">
        <Image className="rounded-b-[32px]" style={{ objectFit: 'cover' }} fill src={imageUrl} alt="NFT Image" />
      </div>
      <div className="px-4 py-8 flex max-w-[980px] flex-col items-start gap-2">
        <TypographyH2 noBorder>Confirm Transaction</TypographyH2>
        <TypographyP className="text-slate-300 [&:not(:first-child)]:mt-0">
          You{"'"} re about to <span className="font-semibold">mint an Art NFT</span>, and list on marketplace{' '}
          <span className="font-semibold">so others can buy its prompts</span>.<br />
          Are you sure you want to proceed?
        </TypographyP>
        <TypographySmall className="text-slate-50 mt-8 mb-2">Transaction Details</TypographySmall>
        <div className="w-full grid grid-cols-5 rounded-2xl bg-slate-900 mb-8 px-4 py-4">
          <div className="col-span-2 space-y-2 flex flex-col">
            <TypographySmall>Token Account</TypographySmall>
            <TypographySmall>Txn Fee</TypographySmall>
            <TypographySmall>Listing Price</TypographySmall>
            <TypographySmall>Royalty</TypographySmall>
          </div>
          <div className="col-span-3 space-y-2 flex flex-col items-end opacity-50">
            <TypographySmall>{minimizeAddress(address)}</TypographySmall>
            <TypographySmall>0.01 SOL</TypographySmall>
            <TypographySmall>{priceInFlow || 'Free'}</TypographySmall>
            <TypographySmall>{royaltyFee > 1 ? royaltyFee : Math.floor(royaltyFee * 100)}%</TypographySmall>
          </div>
        </div>
        <Button className="w-full h-12 bg-slate-50 rounded-full text-lg font-semibold">
          <Icons.check className="mr-1" />
          Confirm
        </Button>
      </div>
    </div>
  );
}

const minimizeAddress = (address: string) =>
  address.length > 10 ? address.slice(0, 8) + '...' + address.slice(-8) : address;
