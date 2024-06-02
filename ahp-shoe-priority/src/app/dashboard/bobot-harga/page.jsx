"use client"

import Link from "next/link"
import { MdAdd } from "react-icons/md"
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Page() {

    // USE STATE
    // --------------------------------------------
    const [message, setMessage] = useState("");
    const [bobotHarga, setBobotHarga] = useState([]);


    const [jumlahHarga, setJumlahHarga] = useState(0);
    const [randomIndex, setRandomIndex] = useState(0);

    const [hasilAHP, setHasilAHP] = useState([]);
    const [isConsistent, setIsConsistent] = useState(false);


    // AHP MERK
    // Fungsi AHP untuk perhitungan
    const calculateAHP = (data) => {
        // Matriks perbandingan berpasangan
        const comparisonMatrix = data.map(row => {
            return data.map(col => {
                if (row.name === col.name) return 1;
                return row.bobot / col.bobot;
            });
        });

        // console.log("Matriks Perbandingan Berpasangan:");
        // console.log(comparisonMatrix);

        // Menghitung jumlah per kolom dari matriks perbandingan
        const totalPerColumn = Array.from(Array(data.length), () => 0);
        comparisonMatrix.forEach(row => {
            row.forEach((val, index) => {
                totalPerColumn[index] += val;
            });
        });

        // console.log("Jumlah Per Kolom:");
        // console.log(totalPerColumn);

        // Normalisasi matriks perbandingan
        const normalizedMatrix = comparisonMatrix.map(row => {
            return row.map((val, index) => val / totalPerColumn[index]);
        });

        // console.log("Matriks Perbandingan yang Dinormalisasi:");
        // console.log(normalizedMatrix);

        // Menghitung jumlah per kolom dari matriks normalisasi
        const totalPerColumnNormalized = normalizedMatrix.reduce((acc, row) => {
            row.forEach((val, index) => {
                acc[index] += val;
            });
            return acc;
        }, Array.from(Array(data.length), () => 0));

        // console.log("Jumlah Per Kolom dari Matriks Normalisasi:");
        // console.log(totalPerColumnNormalized);

        // Menghitung jumlah per baris dari matriks normalisasi
        const totalPerRowNormalized = normalizedMatrix.map(row =>
            row.reduce((acc, val) => acc + val, 0)
        );

        // console.log("Jumlah Per Baris dari Matriks Normalisasi:");
        // console.log(totalPerRowNormalized);

        // Menghitung eigenvalue
        const eigenvalues = normalizedMatrix.map(row => row.reduce((acc, val) => acc + val, 0) / normalizedMatrix.length);

        // console.log("Eigenvalues:");
        // console.log(eigenvalues);

        // Menghitung jumlah eigenvalue
        const sumEigenvalues = eigenvalues.reduce((acc, val) => acc + val, 0);

        // console.log("Jumlah Eigenvalues:");
        // console.log(sumEigenvalues);

        // Menghitung eigenvector
        const eigenvector = eigenvalues.map(val => val / sumEigenvalues);

        // console.log("Eigenvector:");
        // console.log(eigenvector);

        // Menghitung Consistency Index (CI)
        const n = data.length;
        const lambdaMax = eigenvector.reduce((acc, val, index) => acc + val * comparisonMatrix[index][index], 0);
        const consistencyIndex = (lambdaMax - n) / (n - 1);

        // console.log("Consistency Index (CI):", consistencyIndex);

        // Mendapatkan nilai Random Index (RI)
        const randomIndex = {
            1: 0,
            2: 0,
            3: 0.58,
            4: 0.90,
            5: 1.12,
            6: 1.24,
            7: 1.32,
            8: 1.41,
            9: 1.45,
            10: 1.49
        };

        const RI = randomIndex[n];
        // console.log("RI:", RI);

        // SET JUMLAH KRITERIA
        setJumlahHarga(n);

        // SET RANDOM INDEX
        setRandomIndex(RI);

        // Menghitung Consistency Ratio (CR)
        const consistencyRatio = consistencyIndex / RI;

        // console.log("Consistency Ratio (CR):", consistencyRatio);

        // Penentuan konsistensi
        const consistencyThreshold = 0.1; // Threshold konsistensi yang diinginkan
        const isConsistent = consistencyRatio < consistencyThreshold;

        // console.log("Apakah konsisten?");
        // console.log(isConsistent);
        setIsConsistent(isConsistent);

        // Menambahkan nama kriteria dan bobot akhirnya

        const prioritiesWithCriteria = data.map((item, index) => ({
            harga: item.name,
            prioritas: eigenvector[index],
            bobot_akhir: item.bobot * eigenvector[index]
        }));

        setHasilAHP(prioritiesWithCriteria);
    };



    // GET BOBOT MERK
    const getBobotMerk = async () => {
        try {
            const response = await fetch("/api/harga", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const { data } = await response.json();
            setBobotHarga(data);

            calculateAHP(data);
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE BOBOT MERK BY ID
    const deleteHargaById = async (id) => {
        try {
            await fetch(`/api/harga?id=${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            setMessage("Data Harga Berhasil Di Hapus");
            setTimeout(() => {
                setMessage("");
                redirect("/dashboard/bobot-harga");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const insertHasilAHP = async (e) => {
        e.preventDefault();

        const dataKriteria = JSON.stringify({ hasilAHP });
        
        try {
            const response = await fetch("/api/bobot-harga", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: dataKriteria
            });

            if (response) setMessage("Data Hasil Perhitungan AHP Berhasil Disimpan Di Database");
            setTimeout(() => { setMessage("");}, 3000);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getBobotMerk();
    }, [])


    return (
        <div className="w-full h-screen select-none">

            <div className="w-full flex justify-between items-center">
                <h1 className="text-xl uppercase font-bold select-none">Halaman Bobot Harga</h1>

                <div className="flex items-center gap-2.5">
                    <button onClick={insertHasilAHP} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5">
                        Simpan Hasil Perhitungan
                    </button>
                    <Link href={"/dashboard/bobot-harga/create"} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5">
                        <MdAdd className="text-xl" />Tambah Data Harga
                    </Link>
                </div>
            </div>

            {message && (
                <div className="w-full flex justify-center items-center p-2 bg-slate-950 text-white my-2">
                    <h1 className="text-xl uppercase font-bold select-none">{message}</h1>
                </div>
            )}


            {/* ----------------------------------------------------------------------------------------- */}
            {/* TABEL                                                                                     */}
            {/* ----------------------------------------------------------------------------------------- */}
            <h1 className="text-xl uppercase font-bold select-none my-4 underline underline-offset-4">Daftar Merk</h1>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th className="text-center p-2 border border-slate-900 w-12">No</th>
                        <th className="text-left p-2 border border-slate-900">Merk</th>
                        <th className="text-center p-2 border border-slate-900 w-10">Bobot</th>
                        <th className="text-center p-2 border border-slate-900 w-40">Aksi</th>
                    </tr>

                </thead>
                <tbody>
                    {bobotHarga.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-2 border border-slate-900">Data Tidak Ada</td>
                        </tr>
                    ) : bobotHarga.map((bobotHarga, index) => (
                        <tr key={bobotHarga.id}>
                            <td className="text-center p-2 border border-slate-900">{index + 1}</td>
                            <td className="p-2 border border-slate-900">{bobotHarga.name}</td>
                            <td className="text-center p-2 border border-slate-900">{bobotHarga.bobot}</td>
                            <td className="p-2 border border-slate-900 flex items-center gap-2.5">
                                <Link href={`/dashboard/bobot-harga/${bobotHarga.id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5"> Edit </button>
                                </Link>
                                <button onClick={() => deleteHargaById(bobotHarga.id)} className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 flex items-center gap-2.5"> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th className="text-left p-2 border border-slate-900">Jumlah Harga</th>
                        <th className="text-left p-2 border border-slate-900">Random Index</th>
                        <th className="text-left p-2 border border-slate-900">Konsistensi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="p-2 border border-slate-900">{jumlahHarga}</td>
                        <td className="p-2 border border-slate-900">{randomIndex}</td>
                        <td className="p-2 border border-slate-900">{isConsistent ? "Konsisten" : "Tidak Konsisten"}</td>
                    </tr>
                </tbody>

            </table>


            <h1 className="text-xl uppercase font-bold select-none my-4 underline underline-offset-4">Hasil Perhitungan AHP Bobot Harga</h1>

            {/* ----------------------------------------------------------------------------------------- */}
            {/* TABEL                                                                                     */}
            {/* ----------------------------------------------------------------------------------------- */}
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th className="text-center p-2 border border-slate-900 w-12">No</th>
                        <th className="text-left p-2 border border-slate-900">Harga</th>
                        <th className="text-left p-2 border border-slate-900">Prioritas</th>
                        <th className="text-left p-2 border border-slate-900">Bobot Akhir</th>
                    </tr>

                </thead>
                <tbody>
                    {hasilAHP.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center p-2 border border-slate-900">Data Tidak Ada</td>
                        </tr>
                    ) : (
                        hasilAHP.sort((a, b) => b.prioritas - a.prioritas).map((item, index) => (
                            <tr key={`${item.id}-${index}`}>
                                <td className="text-center p-2 border border-slate-900">{index + 1}</td>
                                <td className="p-2 border border-slate-900">{item.harga}</td>
                                <td className="p-2 border border-slate-900">{item.prioritas}</td>
                                <td className="p-2 border border-slate-900">{item.bobot_akhir}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </div>
    )
}