import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";


export async function POST(req) {
    try {
        // -------------------------------------------------------------
        // TODO : TANGKAP DATA DARI REQUEST BODY
        // -------------------------------------------------------------
        const { username, password } = await req.json()

        // -------------------------------------------------------------
        // TODO LAKUKAN QUERY CARI DATA USERNAME
        // -------------------------------------------------------------
        const response = await prisma.user.findMany({
            where: { username: username }
        })


        // -------------------------------------------------------------
        // CEK USERNAME
        // -------------------------------------------------------------
        if (response.length == 0) {
            return res.json({
                status: 200,
                message: "Username not found"
            })
        }


        // -------------------------------------------------------------
        // CEK PASSWORD
        // -------------------------------------------------------------
        if (response[0].password != password) {
            return res.json({
                status: 200,
                message: "Wrong password"
            })
        }


        // -------------------------------------------------------------
        // LOGIN BERHASIL
        // -------------------------------------------------------------
        return res.json({
            status: 200,
            message: "Login Success",
            data: response
        })
    } catch (error) {
        console.log(error)
    }
}