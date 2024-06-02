"use client"

import { useState, useEffect } from "react";

export default function Page() {
    const [ahpBobotMerk, setAHPBobotMerk] = useState([]);

    const getAHPBobotMerk = async () => {
        try {
            const response = await fetch("/api/bobot-merk", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const { data } = await response.json();
            setAHPBobotMerk(data);

            // console.log(data);
        } catch (error) {
            console.log(error);   
        }
    }

    useEffect(() => {
        getAHPBobotMerk();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-semibold">AHP Bobot Merk</h1>

            <table className="w-full mt-5">
                <thead>
                    <tr>
                        <th className="text-center w-11 p-2 border border-black">No</th>
                        <th className="text-center p-2 border border-black">Merk</th>
                        <th className="text-center p-2 border border-black">Prioritas</th>
                        <th className="text-center p-2 border border-black">Bobot</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ahpBobotMerk.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center p-2 border border-black">{index + 1}</td>
                                    <td className="text-start p-2 border border-black">{item.merk}</td>
                                    <td className="text-start p-2 border border-black">{item.prioritas}</td>
                                    <td className="text-start p-2 border border-black">{item.bobot_akhir}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}