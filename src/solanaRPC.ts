import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  RpcResponseAndContext,
  SignatureResult,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { SafeEventEmitterProvider } from '@web3auth/base';
import { SolanaWallet } from '@web3auth/solana-provider';

export const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

export const DEVNET_ADDRESSES = {
  DuckeePromptMarketProgram: 'EvQGLnWG9UVFh9jn8DjnHRQYdS5FyryJBDC8XpRWPWMR',
  PromptMarket: 'g5QP8GsA7AmdnMv7QWFDxDBASyy2nmjgCSVvF6xoATu',
  FakeUSDCMint: 'q3bd6t5p61uQtudkkHtEwUnLjwyZHbF4P6osuqsf91t',
};

export default class SolanaRpc {
  private provider: SafeEventEmitterProvider;
  public wallet: SolanaWallet;
  public connection: Connection;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
    this.wallet = new SolanaWallet(provider);
    this.connection = new Connection(SOLANA_RPC_URL);
  }

  async getAccounts(): Promise<string[]> {
    try {
      const acc = await this.wallet.requestAccounts();
      return acc;
    } catch (error) {
      return error as string[];
    }
  }

  async getBalance(): Promise<string> {
    try {
      const accounts = await this.wallet.requestAccounts();
      const balance = await this.connection.getBalance(new PublicKey(accounts[0]));

      return balance.toString();
    } catch (error) {
      return error as string;
    }
  }

  async waitForConfirm(txId: string): Promise<RpcResponseAndContext<SignatureResult>> {
    const latestBlockHash = await this.connection.getLatestBlockhash();
    return await this.connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: txId,
    });
  }

  async signTestMessage(): Promise<string> {
    try {
      const msg = Buffer.from('Test Signing Message ', 'utf8');
      const res = await this.wallet.signMessage(msg);

      return res.toString();
    } catch (error) {
      return error as string;
    }
  }

  async sendTestTransaction(): Promise<string> {
    const accounts = await this.wallet.requestAccounts();
    const block = await this.connection.getLatestBlockhash('finalized');

    const TransactionInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(accounts[0]),
      toPubkey: new PublicKey(accounts[0]),
      lamports: 0.01 * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction({
      blockhash: block.blockhash,
      lastValidBlockHeight: block.lastValidBlockHeight,
      feePayer: new PublicKey(accounts[0]),
    }).add(TransactionInstruction);

    const { signature } = await this.wallet.signAndSendTransaction(transaction);

    return signature;
  }

  async signTestTransaction(): Promise<string> {
    try {
      const pubKey = await this.wallet.requestAccounts();
      const { blockhash } = await this.connection.getRecentBlockhash('finalized');
      const TransactionInstruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(pubKey[0]),
        toPubkey: new PublicKey(pubKey[0]),
        lamports: 0.01 * LAMPORTS_PER_SOL,
      });
      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: new PublicKey(pubKey[0]),
      }).add(TransactionInstruction);
      const signedTx = await this.wallet.signTransaction(transaction);

      return signedTx.signature?.toString() || '';
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<string> {
    const privateKey = await this.provider.request({
      method: 'solanaPrivateKey',
    });
    return privateKey as string;
  }
}
