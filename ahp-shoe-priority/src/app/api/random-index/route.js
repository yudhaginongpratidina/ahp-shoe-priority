import { NextResponse as res, NextRequest as req } from "next/server";


export async function GET(req) {

    const data = [
        { id : 1, matrix_size : 1, random_consistency_index : 0.00 },
        { id : 2, matrix_size : 2, random_consistency_index : 0.00 },
        { id : 3, matrix_size : 3, random_consistency_index : 0.58 },
        { id : 4, matrix_size : 4, random_consistency_index : 0.90 },
        { id : 5, matrix_size : 5, random_consistency_index : 1.12 },
        { id : 6, matrix_size : 6, random_consistency_index : 1.24 },
        { id : 7, matrix_size : 7, random_consistency_index : 1.32 },
        { id : 8, matrix_size : 8, random_consistency_index : 1.41 },
        { id : 9, matrix_size : 9, random_consistency_index : 1.45 },
        { id : 10, matrix_size : 10, random_consistency_index : 1.49 }
    ]

    return res.json({ 
        status : 200,
        message : "Success",
        data : data 
    });
}