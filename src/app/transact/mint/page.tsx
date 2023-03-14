'use client';

import { BN, Program, web3 } from '@project-serum/anchor';
import { createApproveCheckedInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { ArtCreation } from '~/@types/art';
import { IDL } from '~/@types/duckee-prompt-market';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { TypographyH2, TypographyP, TypographySmall } from '~/components/ui/typography';
import { useToast } from '~/hooks/use-toast';
import { useWeb3Auth } from '~/hooks/use-web3auth';
import { returnToAppWithData } from '~/lib/in-app-browser';
import SolanaRpc, { DEVNET_ADDRESSES } from '~/solanaRPC';

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
  const { toast } = useToast();
  const data = useSearchParams().get('data') ?? DEFAULT_ART_JSON;
  const [address, setAddress] = useState('-');
  const [isSending, setIsSending] = useState(false);
  const creation: ArtCreation = JSON.parse(data);
  const { imageUrl, description, priceInFlow, royaltyFee } = creation;

  const handleTransaction = useCallback(async () => {
    if (!provider) {
      return;
    }
    try {
      setIsSending(true);
      const solana = new SolanaRpc(provider);
      const balance = await solana.getBalance();
      console.log(`Using ${balance} LAMPORT SOL`);

      // 1. mint NFT
      const signerPub = new web3.PublicKey((await solana.getAccounts())[0]);
      const { data: createNftResult } = await axios.post('https://api-solana.duckee.xyz/art/v1/nft', {
        recipient: signerPub.toBase58(),
        art: {
          tokenId: -1,
          description,
          imageUrl,
          parentTokenId: creation.parentTokenId,
        },
      });
      const { txId: createNftTx, tokenMint } = createNftResult as { tokenMint: string; txId: string };
      console.log(`tokenMint: ${tokenMint}`);

      if (priceInFlow === 0) {
        const response: MintTransactResponse = {
          tokenMint,
          txId: createNftTx,
          blockExplorerUrl: `https://solscan.io/tx/${createNftTx}?cluster=devnet`,
        };
        return returnToAppWithData('mint_result', response);
      }

      const program = new Program(IDL, DEVNET_ADDRESSES.DuckeePromptMarketProgram, solana);
      const tokenMintPub = new web3.PublicKey(tokenMint);

      const [listingPda] = findListingAccount(program, signerPub, tokenMintPub);
      console.log(`Listing PDA: ${listingPda.toBase58()}`);

      const [programAsSigner, pasBump] = findPromptMarketProgramAsSigner(program);
      console.log(`Program-as-Signer PDA: ${programAsSigner.toBase58()} (${pasBump})`);

      const tokenAccountPub = await getAssociatedTokenAddress(tokenMintPub, signerPub);

      const block = await solana.connection.getLatestBlockhash('finalized');

      const settleTx = new web3.Transaction({
        blockhash: block.blockhash,
        lastValidBlockHeight: block.lastValidBlockHeight,
        feePayer: signerPub,
      }).add(
        createApproveCheckedInstruction(tokenAccountPub, tokenMintPub, programAsSigner, signerPub, 1, 0),
        await program.methods
          .list(new BN(1e9), new BN(0.01 * 1e9), pasBump)
          .accounts({
            user: signerPub,
            promptMarket: new web3.PublicKey(DEVNET_ADDRESSES.PromptMarket),
            listing: listingPda,
            tokenAccount: tokenAccountPub,
            programAsSigner,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
          })
          .instruction(),
      );
      const { signature: txId } = await solana.wallet.signAndSendTransaction(settleTx);
      console.log(`Listing Tx Sent: ${txId}`);

      const response: MintTransactResponse = {
        tokenMint,
        txId,
        blockExplorerUrl: `https://solscan.io/tx/${txId}?cluster=devnet`,
      };
      returnToAppWithData('mint_result', response);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Unable to send a transaction',
        description: (err as Error).message,
      });
      setIsSending(false);
    }
  }, [provider]);

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
          <span className="font-semibold">so others can {priceInFlow === 0 ? 'view' : 'buy'} its prompts</span>.
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
            <TypographySmall>{priceInFlow ? `${priceInFlow.toFixed(2)} USDC` : 'Free'}</TypographySmall>
            <TypographySmall>{royaltyFee > 1 ? royaltyFee : Math.floor(royaltyFee * 100)}%</TypographySmall>
          </div>
        </div>
        <Button
          disabled={!provider}
          onClick={handleTransaction}
          className="w-full h-12 bg-slate-50 rounded-full text-lg font-semibold"
        >
          {isSending ? (
            <>
              <Icons.spinner className="mr-1 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Icons.check className="mr-1" />
              Confirm
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

const minimizeAddress = (address: string) =>
  address.length > 10 ? address.slice(0, 8) + '...' + address.slice(-8) : address;

const findListingAccount = (promptMarket: Program<any>, lister: web3.PublicKey, nftMint: web3.PublicKey) =>
  web3.PublicKey.findProgramAddressSync(
    [Buffer.from('listing', 'utf8'), lister.toBuffer(), nftMint.toBuffer()],
    promptMarket.programId,
  );

const findPromptMarketProgramAsSigner = (promptMarket: Program<any>) =>
  web3.PublicKey.findProgramAddressSync(
    ['prompt_market', 'signer'].map((seed) => Buffer.from(seed, 'utf8')),
    promptMarket.programId,
  );
