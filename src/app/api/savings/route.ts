import { NextResponse } from "next/server";
import fsPromises from 'fs/promises';
import path from 'path';


const userFilePath = path.join(process.cwd(), 'public/mocks/savings.json')

export async function GET() {
    try {
        const savings = await fsPromises.readFile(userFilePath, 'utf-8')
        const json = JSON.parse(savings)
        return NextResponse.json(json)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "No savings data found!" }),
            { status: 404, headers: { 'content-type': 'application/json' } });
    }
}

