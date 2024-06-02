"use client"


import ButtonComponent from "@/components/button_component";
import TextFieldComponent from "@/components/textfield_component";
import { FaListUl } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function CreateKriteria(props) {

    const router = useRouter();


    const [interests, setInterests] = useState([]);
    const [naamaKriteria, setNaamaKriteria] = useState("");
    const [bobotKriteria, setBobotKriteria] = useState("");
    const [message, setMessage] = useState("");


    const getIntensitasKepentingan = async () => {
        try {
            const response = await fetch("/api/interest", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { data } = await response.json();
            setInterests(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getIntensitasKepentingan();
    }, []);


    const handleCreateKriteria = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/merk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: naamaKriteria,
                    bobot: bobotKriteria
                })
            })

            const data = await response.json();
            setMessage(data.message);

            setTimeout(() => {
                router.push("/dashboard/bobot-merk");
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            {/* ============================================================================= */}
            {/* FORM TAMBAH DATA KRITERIA */}
            {/* ============================================================================= */}
            <div className={` w-full max-w-screen-sm p-5 fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md drop-shadow-sm border`}>
                <div className="mb-5">
                    <h1>Tambah Bobot Merk Baru</h1>
                </div>

                {/* ============================================================================= */}
                {/* PESAN                                                                         */}
                {/* ============================================================================= */}
                {message && (
                    <div className="mb-5 p-2 w-full bg-green-500">
                        <p className="text-sm text-white">{message}</p>
                    </div>
                )}

                

                <form onSubmit={handleCreateKriteria}>
                    {/* ============================================================================= */}
                    {/* NAMA KRITERIA */}
                    {/* ============================================================================= */}
                    <TextFieldComponent id="kriteria" name="Nama Merk" value={naamaKriteria} onChange={(e) => setNaamaKriteria(e.target.value)} required={true}/>

                    {/* ============================================================================= */}
                    {/* BOBOT KRITERIA */}
                    {/* ============================================================================= */}
                    <div className="relative flex flex-col gap-2 mb-5">
                        <label htmlFor="bobot" className="text-md text-gray-500 capitalize">Bobot Merk</label>
                        <div className="flex border-2">
                            <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                            <select name="bobotKriteria" id="bobotKriteria" className="w-full border-none p-2 outline-none" value={bobotKriteria} onChange={(e) => setBobotKriteria(e.target.value)} required>
                                <option value="">=== Tentukan Bobot ===</option>
                                {interests?.map(item => (
                                    <option key={item.id} value={item.interest}>{item.interest} - {item.description}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <ButtonComponent name="Tambah" type="submit" btnType="create" />
                    </div>
                </form>
            </div>
        </>
    )
}