"use client";

import { useState, useEffect } from "react";

export default function Page() {

    const [countKriteria, setCountKriteria] = useState(0);
    const [countMerk, setCountMerk] = useState(0);
    const [countHarga, setCountHarga] = useState(0);
    const [countTujuan, setCountTujuan] = useState(0);
    const [countAlternative, setCountAlternative] = useState(0);

    const getCount = async () => {
        try {
            const response = await fetch("/api/count-kriteria", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const { data } = await response.json();

            setCountKriteria(data.count_kriteria);
            setCountMerk(data.count_merk);
            setCountHarga(data.count_harga);
            setCountTujuan(data.count_tujuan);
            setCountAlternative(data.count_alternative);
        } catch (error) {
            
        }
    }


    useEffect(() => {
        getCount();
    }, []);

    return (
        <div>
            <div className="w-full h-[200px] bg-slate-900 flex flex-col justify-center items-start gap-4 p-5">
                <h1 className="text-3xl text-white font-semibold">🚀 Wellcome To Shoe Priority</h1>
                <button className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                    Lakukan Perhitungan
                </button>
            </div>


            <div className="w-full grid grid-cols-4 h-[350px] mt-5 gap-4">
                <div className="w-full bg-blue-700 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">{countKriteria} Kriteria</h1>
                </div>
                <div className="w-full bg-green-700 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">{countMerk} Merk</h1>
                </div>
                <div className="w-full bg-yellow-700 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">{countHarga} Harga</h1>
                </div>
                <div className="w-full bg-rose-700 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">{countTujuan} Tujuan</h1>
                </div>
                <div className="w-full bg-indigo-700 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">{countAlternative} Alternative</h1>
                </div>
            </div>
        </div>
    )
}