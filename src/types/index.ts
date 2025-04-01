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

export type Balance = {
    amount: number;
    currency: string;
    monthlyTrend: 'upward' | 'downward';
    percentageChange: number;
}

export type Investment = {
    platform: string;
    account_number: number;
    investment: number;
}
export type InvestmentsProps = Investment[]
export type User = {
    id: string;
    name: string;
    totalBalance: Balance;
    totalInvestment: Balance;
    totalReturns: Balance;
};
