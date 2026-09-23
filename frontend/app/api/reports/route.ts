import { NextResponse } from "next/server";
import { getReportsFromBackend } from "@/lib/backendApi";

export async function GET() {
    try {
        const summary = await getReportsFromBackend();
        return NextResponse.json(summary, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: { message: error instanceof Error ? error.message : "Unable to fetch reports." } },
            { status: 500 }
        );
    }
}