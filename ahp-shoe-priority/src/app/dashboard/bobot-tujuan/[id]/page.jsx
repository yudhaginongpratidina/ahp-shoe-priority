"use client"

import { useEffect, useState } from "react";
import TextFieldComponent from "@/components/textfield_component";
import { FaListUl } from "react-icons/fa6";
import ButtonComponent from "@/components/button_component";

import { useRouter } from "next/navigation";

export default function Page({ params }) {

    const router = useRouter();

    const [tujuan, setTujuan] = useState([]);
    const [interests, setInterests] = useState([]);
    const [name, setName] = useState("");
    const [bobot, setBobot] = useState("");
    const [message, setMessage] = useState("");


    const getBobotHargaById = async () => {
        try {
            const response = await fetch(`/api/tujuan?id=${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { data } = await response.json();
            setTujuan(data);

            setName(data[0].name);
            setBobot(data[0].bobot);
        } catch (error) {
            console.log(error);
        }
    };

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

    const updateBobotHargaById = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/tujuan?id=${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    bobot: bobot
                })
            });

            const data = await response.json();
            // console.log(data.message);
            setMessage(data.message);

            setTimeout(() => {
                setMessage("");
                router.push("/dashboard/bobot-tujuan");
            }, 1000);
        } catch (error) {
            console.log(error);       
        }
    }

    useEffect(() => {
        getBobotHargaById();
        getIntensitasKepentingan();
    }, []);

    return (
        <div>

            <h1 className="text-3xl font-semibold my-4">Edit Bobot Tujuan</h1>


            {message &&
                <div className="w-full bg-green-500 my-5 p-2">
                    <p className="text-white">{message}</p>
                </div>
            }

            <form onSubmit={updateBobotHargaById}>

                {tujuan.map((tujuan) => (
                    <div key={tujuan.id}>
                        <TextFieldComponent
                            label="Kriteria"
                            name="kriteria"
                            placeholder="Kriteria"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="relative flex flex-col gap-2 mb-5">
                            <label htmlFor="bobot" className="text-md text-gray-500 capitalize">Bobot Harga</label>
                            <div className="flex border-2">
                                <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                                <select name="bobotHarga" id="bobotHarga" className="w-full border-none p-2 outline-none" value={bobot} onChange={(e) => setBobot(e.target.value)} required>
                                    <option value={bobot}>{bobot}</option>
                                    {interests?.map(item => (
                                        <option key={item.id} value={item.interest}>{item.interest} - {item.description}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <ButtonComponent type="submit" name="Simpan" />
                            <ButtonComponent type="button" name="Kembali" onClick={() => router.push("/dashboard/bobot-tujuan")} />
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}