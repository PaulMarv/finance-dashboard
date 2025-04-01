"use client";

import { InvestmentsProps, LoanProps, TransactionProps, User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  transactions: TransactionProps;
  loans: LoanProps;
  investments: InvestmentsProps;
  loading: boolean;
  error: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<TransactionProps>([]);
  const [loans, setLoans] = useState<LoanProps>([]);
  const [investments, setInvestments] = useState<InvestmentsProps>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch User Data
      const userResponse = await fetch("/mocks/user.json");
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch Transactions
      const transactionsResponse = await fetch("/mocks/transactions.json");
      const transactionsData = await transactionsResponse.json();
      setTransactions(transactionsData);

      // Fetch Loans
      const loansResponse = await fetch("/mocks/loans.json");
      const loansData = await loansResponse.json();
      setLoans(loansData);

      //Fetch Investments
      const investmentsResponse = await fetch("/mocks/investments.json");
      const investmentsData = await investmentsResponse.json();
      setInvestments(investmentsData);


      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, transactions, loans, investments, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
