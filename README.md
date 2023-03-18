# Duckee Transaction Wrapper Frontend

This is a transaction wrapper— which connects wallet and sends transaction on behalf of the [Duckee mobile application](https://github.com/duckee-sol/duckee-android-sol)— written in [Next.js](https://nextjs.org/).

### Why You Created Another Frontend?

Current Android development ecosystem of Solana is harsh: Web3Auth does not support any Android SDK for Solana, Anchor does not have client SDK for Android, etc. Instead of working on Android interfaces of existing products (which will be developed in future anyway), we just created a frontend app and displayed in the in-app browser in a seamless way.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
