"use client"
import Link from "next/link"
import { MdAdd } from "react-icons/md"
import { useState, useEffect } from "react"

export default function Page() {
    const [dataAlternatif, setDataAlternatif] = useState([]);
    const [message, setMessage] = useState("");



    const getAllBobot = async () => {
        try {
            const response = await fetch("/api/data-alternative", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            const { data } = await response.json();
            // console.log(data.data_alternative);
            setDataAlternatif(data.data_alternative);
        } catch (error) {
            console.log(error);
        }
    }


    const deleteAlternativeById = async (id) => {
        try {
            await fetch(`/api/data-alternative?id=${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            setMessage("Data Alternative Berhasil Di Hapus");
            setTimeout(() => {
                setMessage("");
                // redirect("/dashboard/data-alternative");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBobot();
    }, [])


    return (
        <div className="w-full h-screen select-none">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-xl uppercase font-bold select-none">Halaman Data Alternative</h1>

                <div className="flex items-center gap-2.5">
                    <Link href={"/dashboard/data-alternative/create"} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5">
                        <MdAdd className="text-xl" />Tambah Data Alternative
                    </Link>
                </div>
            </div>

            {message && (
                <div className="w-full flex justify-center items-center p-2 bg-slate-950 text-white my-2">
                    <h1 className="text-xl uppercase font-bold select-none">{message}</h1>
                </div>
            )}


            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th className="text-center p-2 border border-slate-900 w-12">No</th>
                        <th className="text-left p-2 border border-slate-900">Nama Model Sepatu</th>
                        <th className="text-center p-2 border border-slate-900">Merk</th>
                        <th className="text-center p-2 border border-slate-900">Harga</th>
                        <th className="text-center p-2 border border-slate-900">Tujuan</th>
                        <th className="text-center p-2 border border-slate-900">Bobot</th>
                        <th className="text-center p-2 border border-slate-900 w-40">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {dataAlternatif
                        ?.sort((a, b) => a.totalBobot - b.totalBobot) // Mengurutkan data secara ascending berdasarkan totalBobot
                        .map((data, index) => (
                            <tr key={index}>
                                <td className="text-center p-2 border border-slate-900">{index + 1}</td>
                                <td className="text-left p-2 border border-slate-900">{data.namaModel}</td>
                                <td className="text-center p-2 border border-slate-900">{data.namaMerk}</td>
                                <td className="text-center p-2 border border-slate-900">{data.hargaSepatu}</td>
                                <td className="text-center p-2 border border-slate-900">{data.tujuanPemilihan}</td>
                                <td className="text-center p-2 border border-slate-900">{data.totalBobot}</td>
                                <td className="p-2 border border-slate-900 flex items-center gap-2.5">
                                    <Link href={`/dashboard/data-alternative/${data.id}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5"> Edit </button>
                                    </Link>
                                    <button onClick={() => deleteAlternativeById(data.id)} className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 flex items-center gap-2.5"> Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}