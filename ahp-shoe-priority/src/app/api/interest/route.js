import { NextResponse as res, NextRequest as req } from "next/server";


export async function GET(req) {

    const data = [
        { id : 1, interest : 1, description : "Sama pentingnya dengan yang lain" },
        { id : 2, interest : 2, description : "Nilai diantara dua penilaian yang berderkatan" },
        { id : 3, interest : 3, description : "Sedikit lebih penting dibanding yang lain" },
        { id : 4, interest : 4, description : "Nilai diantara dua penilaian yang berderkatan" },
        { id : 5, interest : 5, description : "Cukup penting dibanding dengan yang lain" },
        { id : 6, interest : 6, description : "Nilai diantara dua penilaian yang berderkatan" },
        { id : 7, interest : 7, description : "Sangat penting dibanding dengan yang lain" },
        { id : 8, interest : 8, description : "Nilai diantara dua penilaian yang berderkatan" },
        { id : 9, interest : 9, description : "Extrim penting dibanding dengan yang lain" },
    ]

    return res.json({ 
        status : 200,
        message : "Success",
        data : data 
    });
}