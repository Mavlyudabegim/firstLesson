enum Currency {
  dollar = '$',
  euro = '€',
}
export interface AccountModel {
  title: string;
  description: string;
  currency: Currency.dollar;
  balance: number;
  _id: string;
  userId: string;
}
