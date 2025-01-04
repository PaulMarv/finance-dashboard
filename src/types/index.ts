export type Transaction = {
    id: string;
    description: string;
    date: string;
    type: 'credit' | 'debit';
    amount: number;
};
export type TransactionProps = Transaction[]

export type Loan = {
    id: string;
    amount: number;
    tenure: number;
    purpose: string;
    fullDescription: string;
    type: 'secure' | 'unsecure'
    interestRate: number
    status: 'active' | 'pending' | 'inactive';
};

export type LoanProps = Loan[]

export type User = {
    id: string;
    name: string;
    accountBalance: number;
    monthlyTrend: string,
    percentageChange: number,
};
