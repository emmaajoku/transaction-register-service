// transaction-received.event.ts
export class TransactionReceivedEvent {
  transactionId: string;
  clientId: string;
  walletAddress: string;
  extraData?: any;
  currencyType: string;
}
