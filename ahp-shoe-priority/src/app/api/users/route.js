import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";


export async function GET(req) {
    // ---------------------------------------------------
    // TODO : INIT PARAMS 
    // ---------------------------------------------------
    const { searchParams } = new URL(req.url);

    try {
        // ---------------------------------------------------
        // TODO : QUERY DATA USER
        // ---------------------------------------------------
        const reponse = await prisma.user.findMany()

        // ---------------------------------------------------
        // TODO : TIDAK ADA DATA USER SATUPUN DI DATABASE
        // ---------------------------------------------------
        if (reponse.length == 0) {
            return res.json({ 
                status : 200,
                message : "Tidak Ada Data User",
            })
        }

        // ---------------------------------------------------
        // TODO : TERDAPAT DATA USER
        // ---------------------------------------------------
        if (searchParams.get("id")) {
            const id = searchParams.get("id")

            // ---------------------------------------------------
            // TODO : CARI USER BERDASARKAN ID
            // ---------------------------------------------------
            const searchUserById = await prisma.user.findMany({
                where: { id: id }
            });
            
            // ---------------------------------------------------
            // TODO : ID TIDAK DITEMUKAN
            // ---------------------------------------------------
            if (searchUserById.length == 0) {   
                return res.json({ 
                    status : 200,
                    message : `ID ${id} Not Found`,
                })
            }
            
            // ---------------------------------------------------
            // TODO : ID DITEMUKAN
            // ---------------------------------------------------
            return res.json({ 
                status : 200,
                message : "Success",
                data : searchUserById
            })
        }
        
        // ---------------------------------------------------
        // TODO : RESPONSE JIKA TIDAK TERDAPAT PARAMETER ID
        // ---------------------------------------------------
        return res.json({
            status : 200,
            message : "Success",
            data : reponse
        })
    } catch (error) {
        console.log(error)   
    }
}


export async function POST(req) {
    try {
        // ---------------------------------------------------
        // TODO : AMBIL DATA DARI REQUEST BODY
        // ---------------------------------------------------
        const { username, password } = await req.json()

        // ---------------------------------------------------
        // TODO : CEK DATA USERNAME APAKAH SUDAH ADA
        // ---------------------------------------------------
        const userExists = await prisma.user.findMany({
            where: { username: username }
        });

        if (userExists.length > 0) {
            return res.json({ 
                status : 200,
                message : "Username is already exists"
            })
        }

        // ---------------------------------------------------
        // TODO : CREATE NEW USER
        // ---------------------------------------------------
        const response = await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        })

        // ---------------------------------------------------
        // TODO : RESPONSE JIKA CREATE DATA USER BERHASIL
        // ---------------------------------------------------
        return res.json({ 
            status : 200,
            message : "Create User Success",
            data : response
        })
    } catch (error) {
        console.log(error)
    }
}


export async function PATCH(req) {
    // ---------------------------------------------------
    // TODO : INIT PARAMS 
    // ---------------------------------------------------
    const { searchParams } = new URL(req.url);

    try {
        const id = searchParams.get("id")
        const { username, password } = await req.json()

        // ---------------------------------------------------
        // TODO : CEK DATA USERNAME APAKAH SUDAH ADA
        // ---------------------------------------------------
        const userExists = await prisma.user.findMany({
            where: { username: username }
        });

        if (userExists.length > 0) {
            return res.json({ 
                status : 200,
                message : "Username is already exists"
            })
        }

        // ---------------------------------------------------
        // TODO : UPDATE USER
        // ---------------------------------------------------
        const response = await prisma.user.update({
            where: { id: id },
            data: {
                username: username,
                password: password
            }
        })
        
        // ---------------------------------------------------
        // TODO : RESPONSE JIKA UPDATE DATA BERHASIL
        // ---------------------------------------------------
        return res.json({ 
            status : 200,
            message : "Update User Success",
            data : response
        })
    } catch (error) {
        console.log(error)
    }
}


export async function DELETE(req) {
    // ---------------------------------------------------
    // TODO : INIT PARAMS 
    // ---------------------------------------------------
    const { searchParams } = new URL(req.url);

    try {
        const id = searchParams.get("id")

        // ---------------------------------------------------
        // TODO : CARI USER BERDASARKAN ID
        // ---------------------------------------------------
        const searchUserById = await prisma.user.findMany({
            where: { id: id }
        });
        
        // ---------------------------------------------------
        // TODO : ID TIDAK DITEMUKAN
        // ---------------------------------------------------
        if (searchUserById.length == 0) {   
            return res.json({ 
                status : 200,
                message : `ID ${id} Not Found`,
            })
        }

        // ---------------------------------------------------
        // TODO : ID DITEMUKAN
        // ---------------------------------------------------
        const response = await prisma.user.delete({
            where: { id: id }
        })
        
        // ---------------------------------------------------
        // TODO : RESPONSE JIKA DELETE DATA BERHASIL
        // ---------------------------------------------------
        return res.json({ 
            status : 200,
            message : "Delete User Success",
            data : response
        })
    } catch (error) {
        console.log(error)
    }
}