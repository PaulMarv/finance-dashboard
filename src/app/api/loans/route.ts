import { NextRequest, NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';


const loansFilePath = path.join(process.cwd(), 'public/mocks/loans.json')

export async function GET() {
    try {
        const loans = await fsPromises.readFile(loansFilePath, 'utf-8')
        const json = JSON.parse(loans)
        return NextResponse.json(json)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "No loan data available!" }),
            { status: 404, headers: { 'content-type': 'application/json' } });
    }
}


export async function POST(req: NextRequest) {

    try {
        const loans = await fsPromises.readFile(loansFilePath, 'utf-8')
        const jsonArray = JSON.parse(loans)
        const { amount, tenure, purpose } = await req.json()

        if (!amount || !tenure || !purpose) {
            return NextResponse.json(
                { error: "All fields (amount, tenure, purpose) are required." },
                { status: 400 }
            );
        }

        const id = crypto.randomBytes(16).toString('hex');
        const status = 'pending'
        const interestRate = 8

        jsonArray.push({ id, amount, tenure, purpose, status, interestRate })

        const updatedData = JSON.stringify(jsonArray)

        await fsPromises.writeFile(loansFilePath, updatedData)
        return new NextResponse(
            JSON.stringify({ message: "Loan request sent successfully!" }),
            { status: 201, headers: { 'content-type': 'application/json' } }
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
            { status: 500, headers: { 'content-type': 'application/json' } });
    }

}
