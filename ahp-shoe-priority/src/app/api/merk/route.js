import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";


export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const reponse = await prisma.merk.findMany({
                where: { id: id }
            });
            
            if (reponse.length == 0) {
                return res.json({
                    status: 200,
                    message: "Tidak ada data merk",
                    data: reponse
                });
            } else {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: reponse
                });
            }
        }

        const reponse = await prisma.merk.findMany();
        return res.json({
            status: 200,
            message: "Success",
            data: reponse
        });
    } catch (error) {
        console.log(error);
    }
}



export async function POST(req) {
    const { name, bobot } = await req.json();

    const reponse = await prisma.merk.create({
        data: {
            name: name,
            bobot: Number(bobot)
        }
    });

    return res.json({
        status: 200,
        message: "Success",
        data: reponse
    });
}


export async function PATCH(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name, bobot } = await req.json();

    try {
        const reponse = await prisma.merk.update({
            where: { id: id },
            data: {
                name: name,
                bobot: Number(bobot)
            }
        })

        if (reponse) {
            return res.json({
                status: 200,
                message: "Success",
                data: reponse
            });
        }
    } catch (error) {
        console.log(error);
    }
}



export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        // console.log(id);
        const reponse = await prisma.merk.delete({
            where: { id: id }
        });

        return res.json({
            status: 200,
            message: "Success",
            data: reponse
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            message: "Error",
            data: null
        });
    }
}
