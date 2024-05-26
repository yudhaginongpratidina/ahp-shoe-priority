import { NextResponse as res, NextRequest as req } from "next/server";

// =================================================================
// API DEFAULT ROUTE
// =================================================================
export async function GET(req) {

    // ==========================================
    // INIT PARAMS 
    // ==========================================
    const { searchParams } = new URL(req.url);


    switch (searchParams.get("cmd")) {
        case "info":
            return res.json({ 
                status : 200,
                appliaction_name : "AHP SHOE PRIORITY",
                description : "Aplikasi Pemilihan Sepatu Menggunakan Metode AHP",
                version : "1.0.0",
            });

        default:
            return res.json({ 
                status : 200,
                message : "Your API is working",
            });
    }
}