import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET (req ) {
    try {
        const hasilBobotHarga = await prisma.hasilBobotHarga.findMany();
        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotHarga,

        });
    } catch (error) {
        return res.json({ message: "Error" });
    }
};



export async function POST(req) {
    try {
        const { hasilAHP } = await req.json();

        // DEBUG
        // ----------------------------------------------------------------
        // console.log(hasilAHP);


        // LAKUKAN TRUCATE
        // ------------------------------------------------------------------
        await prisma.hasilBobotHarga.deleteMany();

        const hasilBobotHarga = await prisma.hasilBobotHarga.createMany({
            data: hasilAHP.map(item => ({
                harga: item.harga,
                prioritas: item.prioritas,
                bobot_akhir: item.bobot_akhir
            }))
        });


        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotHarga
        });
    } catch (error) {
        console.log(error);
    }
}