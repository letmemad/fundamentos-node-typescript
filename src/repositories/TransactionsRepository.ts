import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Numbers {
  previousValue: number;
  currentValue: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(transaction => {
        return transaction.type === 'income' ? transaction.value : 0;
      })
      .reduce((total, current) => {
        return total + current;
      }, 0);

    const outcome = this.transactions
      .map(transaction => {
        return transaction.type === 'outcome' ? transaction.value : 0;
      })
      .reduce((total, current) => {
        return total + current;
      }, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(
    title: string,
    type: 'income' | 'outcome',
    value: number,
  ): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
