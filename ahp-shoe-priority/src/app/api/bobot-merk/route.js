import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET (req ) {
    try {
        const hasilBobotMerk = await prisma.hasilBobotMerk.findMany();
        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotMerk,

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
        await prisma.hasilBobotMerk.deleteMany();

        const hasilBobotMerk = await prisma.hasilBobotMerk.createMany({
            data: hasilAHP.map(item => ({
                merk: item.merk,
                prioritas: item.prioritas,
                bobot_akhir: item.bobot_akhir
            }))
        });


        return res.json({
            status: 200,
            message: "Success",
            data: hasilBobotMerk
        });
    } catch (error) {
        console.log(error);
    }
}