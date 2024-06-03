import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req) {
    try {
        const count_kriteria = await prisma.kriteria.count();
        const count_merk = await prisma.merk.count();
        const count_harga = await prisma.harga.count();
        const count_tujuan = await prisma.tujuan.count();
        const count_alternative = await prisma.DataAlternative.count();


        return res.json({
            status: 200,
            message: "Success",
            data: {
                count_kriteria : count_kriteria,
                count_merk : count_merk,
                count_harga : count_harga,
                count_tujuan : count_tujuan,
                count_alternative : count_alternative
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}
