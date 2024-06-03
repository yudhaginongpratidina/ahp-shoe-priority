"use client"

import { useState, useEffect } from "react";
import TextFieldComponent from "@/components/textfield_component";
import ButtonComponent from "@/components/button_component";
import { FaListUl } from "react-icons/fa6";
import { useRouter } from 'next/navigation'

export default function Page({ params }) {
    const router = useRouter();

    const [bobotKriteria, setBobotKriteria] = useState([]);
    const [bobotMerk, setBobotMerk] = useState([]);
    const [bobotHarga, setBobotHarga] = useState([]);
    const [bobotTujuan, setBobotTujuan] = useState([]);
    const [totalBobot, setTotalBobot] = useState(0);
    const [message, setMessage] = useState("");

    const [namaModel, setNamaModel] = useState("");
    const [namaMerk, setNamaMerk] = useState("");
    const [hargaSepatu, setHargaSepatu] = useState("");
    const [tujuanPembelian, setTujuanPembelian] = useState("");

    const getAllBobot = async () => {
        try {
            const response = await fetch("/api/data-alternative", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const { data } = await response.json();
            setBobotKriteria(data.bobot_kriteria);
            setBobotMerk(data.bobot_merk);
            setBobotHarga(data.bobot_harga);
            setBobotTujuan(data.bobot_tujuan);
        } catch (error) {
            console.log(error);
        }
    };

    const getDataAlternativeById = async () => {
        try {
            const response = await fetch(`/api/data-alternative?id=${params.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const { data } = await response.json();
            setNamaModel(data[0].namaModel);
            setNamaMerk(data[0].namaMerk);
            setHargaSepatu(data[0].hargaSepatu);
            setTujuanPembelian(data[0].tujuanPembelian);
        } catch (error) {
            console.log(error);
        }
    };

    const updateAlternativeById = async (e) => {
        e.preventDefault();

        try {
            let total = 0;
            if (namaMerk && hargaSepatu && tujuanPembelian) {
                const bobot_kriteria_merk = Number(bobotKriteria.find((item) => item.kriteria === "Merk").bobot_akhir);
                const bobot_kriteria_harga = Number(bobotKriteria.find((item) => item.kriteria === "Harga").bobot_akhir);
                const bobot_kriteria_tujuan = Number(bobotKriteria.find((item) => item.kriteria === "Tujuan").bobot_akhir);

                const selectedMerk = bobotMerk.find((item) => item.merk === namaMerk);
                const selectedHarga = bobotHarga.find((item) => item.harga === hargaSepatu);
                const selectedTujuan = bobotTujuan.find((item) => item.tujuan === tujuanPembelian);

                const bobot_merk = Number(selectedMerk.bobot_akhir);
                const bobot_harga = Number(selectedHarga.bobot_akhir);
                const bobot_tujuan = Number(selectedTujuan.bobot_akhir);

                console.log(bobot_merk, bobot_harga, bobot_tujuan);

                const total_bobot = (bobot_merk * bobot_kriteria_merk) + (bobot_harga * bobot_kriteria_harga) + (bobot_tujuan * bobot_kriteria_tujuan);
                total = total_bobot;


                console.log(total);

                setTotalBobot(total);

                console.log(totalBobot);

                const response = await fetch(`/api/data-alternative?id=${params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        namaModel: namaModel,
                        namaMerk: namaMerk,
                        hargaSepatu: hargaSepatu,
                        tujuanPembelian: tujuanPembelian,
                        totalBobot: total
                    })
                });

                const data = await response.json();

                setMessage(data.message);
                setTimeout(() => {
                    router.push("/dashboard/data-alternative");
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBobot();
        getDataAlternativeById();
    }, [params.id]); // Menggunakan params.id sebagai dependency

    return (
        <div className="w-full h-screen select-none">
            <h1 className="text-xl uppercase font-bold select-none">Edit Data Alternative</h1>

            {message && (
                <div className="mb-5 p-2 w-full bg-green-500">
                    <p className="text-sm text-white">{message}</p>
                </div>
            )}

            <form onSubmit={updateAlternativeById}>
                <TextFieldComponent
                    id="nama_model"
                    label="Nama Model"
                    value={namaModel}
                    onChange={(e) => setNamaModel(e.target.value)}
                />

                <div className="relative flex flex-col gap-2 mb-5">
                    <label htmlFor="merk" className="text-md text-gray-500 capitalize">Merk Sepatu</label>
                    <select name="merkSepatu" id="merkSepatu" className="w-full border border-gray-300 p-2" value={namaMerk} onChange={(e) => setNamaMerk(e.target.value)}>
                        <option value="">Select...</option> {/* Menambahkan opsi default */}
                        {bobotMerk?.map(item => (
                            <option key={item.id} value={item.merk}>{item.merk}</option>
                        ))}
                    </select>
                </div>

                <div className="relative flex flex-col gap-2 mb-5">
                    <label htmlFor="harga" className="text-md text-gray-500 capitalize">Harga Sepatu</label>
                    <div className="flex border-2">
                        <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                        <select name="hargaSepatu" id="hargaSepatu" className="w-full border-none p-2 outline-none" value={hargaSepatu} onChange={(e) => setHargaSepatu(e.target.value)}>
                            <option value="">Select...</option> {/* Menambahkan opsi default */}
                            {bobotHarga?.map(item => (
                                <option key={item.id} value={item.harga}>{item.harga}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="relative flex flex-col gap-2 mb-5">
                    <label htmlFor="tujuan" className="text-md text-gray-500 capitalize">Tujuan</label>
                    <div className="flex border-2">
                        <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                        <select name="tujuan" id="tujuan" className="w-full border-none p-2 outline-none" value={tujuanPembelian} onChange={(e) => setTujuanPembelian(e.target.value)}>
                            <option value="">Select...</option> {/* Menambahkan opsi default */}
                            {bobotTujuan?.map(item => (
                                <option key={item.id} value={item.tujuan}>{item.tujuan}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <ButtonComponent type="submit" name="Simpan Data Alternative" btnType="update" />
            </form>
        </div>
    );
}
