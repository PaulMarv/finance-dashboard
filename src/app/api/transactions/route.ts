import { NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';


const transactionsFilePath = path.join(process.cwd(), 'public/mocks/transactions.json');

export async function GET(request: Request) {
    const url = new URL(request.url);

    const sortBy = url.searchParams.get("sortBy");
    const filterByType = url.searchParams.get("filterByType");

    try {
        const fileContent = await fsPromises.readFile(transactionsFilePath, 'utf-8');
        const transactions = JSON.parse(fileContent);

        let filteredTransactions = [...transactions];

        if (filterByType) {
            filteredTransactions = filteredTransactions.filter(
                (transaction) => transaction.type === filterByType
            );
        }

        if (sortBy === "date") {
            filteredTransactions.sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        } else if (sortBy === "amount") {
            filteredTransactions.sort((a, b) => a.amount - b.amount);
        } else if (sortBy === "type") {
            filteredTransactions.sort((a, b) => a.type.localeCompare(b.type));
        }

        return NextResponse.json(filteredTransactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ error: "Unable to fetch transactions" }, { status: 500 });
    }
}

