'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { TypographyH2, TypographyP, TypographySmall } from '~/components/ui/typography';

export default function MintTransactPage() {
  const data = useSearchParams().get('data') ?? '{}';
  const {} = JSON.parse(data);

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex-1 relative">
        <Image
          className="rounded-b-[32px]"
          style={{ objectFit: 'cover' }}
          fill
          src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=500&dpr=2&q=80"
          alt="NFT Image"
        />
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
            <TypographySmall>Recipient</TypographySmall>
            <TypographySmall>Txn Fee</TypographySmall>
            <TypographySmall>List Pricing</TypographySmall>
          </div>
          <div className="col-span-3 space-y-2 flex flex-col items-end opacity-50">
            <TypographySmall>72wKQJZSaPkF...ordznHZ1bHgC</TypographySmall>
            <TypographySmall>0.01 SOL</TypographySmall>
            <TypographySmall>10 USDC</TypographySmall>
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
