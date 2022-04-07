export interface TransactionModel {
  title: string;
  type: string;
  description: string;
  paymentDate: Date;
  categoryId: string;
  transactionAmount: number;
}
