"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TransactionProps } from "@/types";
import React, { useEffect, useState } from "react";



const TransactionsTable = () => {
    const [transactions, setTransactions] = useState<TransactionProps>([]);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [filterByType, setFilterByType] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (sortBy) params.append("sortBy", sortBy);
            if (filterByType) params.append("filterByType", filterByType);

            const response = await fetch(`/api/transactions?${params.toString()}`);
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            console.error(err);
            setError("Error loading transactions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, filterByType]);

    return (
        <div className="rounded-xl border-[1px] px-3 pt-4 border-slate-200 w-full">
            <div className=" px-2 flex justify-between flex-col lg:flex-row">
                <p className='font-medium'>Recent Transactions</p>
                {/* CONTROL */}
                <div className="text-[12px] font-medium flex items-center gap-4">
                    <label>
                        Sort By:
                        <select
                            value={sortBy || ""}
                            onChange={(e) => setSortBy(e.target.value || null)}
                            className="rounded-lg border-[1px] border-slate-200 p-1"
                        >
                            <option value="">None</option>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                            <option value="type">Type</option>
                        </select>
                    </label>

                    <label>
                        Filter By:
                        <select
                            value={filterByType || ""}
                            onChange={(e) => setFilterByType(e.target.value || null)}
                            className="rounded-lg border-[1px] border-slate-200 p-1"
                        >
                            <option value="">All</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="mt-4">
                < Table>
                    <TableHeader>
                        <TableRow className='bg-[#f6f4ff] text-[#8470ff] rounded-full border-none'>
                            <TableHead>S/N</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && <p className="text-slate-400 w-full text-center p-4">Loading transactions...</p>}
                        {error && <p className="error">{error}</p>}
                        {transactions.length === 0 && !loading ? (
                            <TableRow>
                                <TableCell colSpan={4}>No transactions available.</TableCell>
                            </TableRow>
                        ) : (
                            transactions.map((transaction, index) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <span className={`rounded-full py-1 px-2 ${transaction.type === 'credit' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                                            {transaction.type}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionsTable;
