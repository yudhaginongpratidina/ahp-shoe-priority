import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET (req ) {
    try {
        const hasilBobotTujuan = await prisma.hasilBobotTujuan.findMany();
        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotTujuan,

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
        await prisma.hasilBobotTujuan.deleteMany();

        const hasilBobotTujuan = await prisma.hasilBobotTujuan.createMany({
            data: hasilAHP.map(item => ({
                tujuan: item.tujuan,
                prioritas: item.prioritas,
                bobot_akhir: item.bobot_akhir
            }))
        });


        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotTujuan
        });
    } catch (error) {
        console.log(error);
    }
}