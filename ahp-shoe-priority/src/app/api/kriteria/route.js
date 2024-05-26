import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req) {
    const reponse = await prisma.kriteria.findMany();
    return res.json({
        status: 200,
        message: "Success",
        data: reponse
    });
}

export async function POST(req) {
    const { name, bobot } = await req.json();
    
    const reponse = await prisma.kriteria.create({
        data: {
            name : name,
            bobot : Number(bobot)
        }
    });

    return res.json({
        status: 200,
        message: "Success",
        data: reponse
    });
}