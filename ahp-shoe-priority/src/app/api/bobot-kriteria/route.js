import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET (req ) {
    try {
        const hasilBobotKriteria = await prisma.hasilBobotKriteria.findMany();
        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotKriteria,

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
        await prisma.hasilBobotKriteria.deleteMany();

        const hasilBobotKriteria = await prisma.hasilBobotKriteria.createMany({
            data: hasilAHP.map(item => ({
                kriteria: item.kriteria,
                prioritas: item.prioritas,
                bobot_akhir: item.bobot_akhir
            }))
        });


        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotKriteria
        });
    } catch (error) {
        console.log(error);
    }
}