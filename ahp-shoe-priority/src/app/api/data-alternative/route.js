import { NextResponse as res, NextRequest as req } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");


        const hasil_bobot_kriteria = await prisma.hasilBobotKriteria.findMany();
        const hasil_bobot_merk = await prisma.hasilBobotMerk.findMany();
        const hasil_bobot_harga = await prisma.hasilBobotHarga.findMany();
        const hasil_bobot_tujuan = await prisma.hasilBobotTujuan.findMany();
        const data_alternative = await prisma.dataAlternative.findMany();

        if (id) {
            const reponse = await prisma.dataAlternative.findMany({
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

        return res.json({
            status: 200,
            message: "Success",
            data: {
                bobot_kriteria : hasil_bobot_kriteria,
                bobot_merk : hasil_bobot_merk,
                bobot_harga : hasil_bobot_harga,
                bobot_tujuan : hasil_bobot_tujuan,
                data_alternative : data_alternative
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req) {
    try {
        const { namaModel, namaMerk, hargaSepatu, tujuanPembelian, totalBobot } = await req.json();

        const data_alternative = await prisma.dataAlternative.create({
            data: {
                namaModel: namaModel,
                namaMerk: namaMerk,
                hargaSepatu: hargaSepatu,
                tujuanPemilihan: tujuanPembelian,
                totalBobot: totalBobot
            }
        });
        return res.json({
            status: 200,
            message: "Success",
            data: data_alternative
        });
    } catch (error) {
        console.log(error);
    }
}


export async function PATCH(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const { namaModel, namaMerk, hargaSepatu, tujuanPembelian, totalBobot } = await req.json();
        const data_alternative = await prisma.dataAlternative.update({
            where: {
                id: id
            },
            data: {
                namaModel: namaModel,
                namaMerk: namaMerk,
                hargaSepatu: hargaSepatu,
                tujuanPemilihan: tujuanPembelian,
                totalBobot: totalBobot
            }
        });
        return res.json({
            status: 200,
            message: "Success",
            data: data_alternative
        });
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data_alternative = await prisma.dataAlternative.delete({
            where: {
                id: id
            }
        });
        return res.json({
            status: 200,
            message: "Success",
            data: data_alternative
        });
    } catch (error) {
        console.log(error);
    }
}