"use client"
import { useState, useEffect } from "react";

export default function Page() {
    const [randomIndex, setRandomIndex] = useState([]);

    const getDataRandomIndex = async () => {
        try {
            const response = await fetch("/api/random-index", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setRandomIndex(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataRandomIndex();
    }, []);

    return (
        <>
            <h1 className="text-xl uppercase font-bold select-none">Random Index</h1>

            <table className="w-full mt-6 select-none">
                <thead>
                    <tr>
                        <th className="text-center border p-2 w-[5%] border-black">No</th>
                        <th className="text-center border p-2 w-[30%] border-black">Matrik Size</th>
                        <th className="text-center border p-2 border-black">Random Index</th>
                    </tr>
                </thead>

                <tbody>
                    {randomIndex.map((data, index) => (
                        <tr key={index}>
                            <td className="text-center border p-2 border-black">{index + 1}</td>
                            <td className="text-center border p-2 border-black">{data.matrix_size}</td>
                            <td className="text-center border p-2 border-black">{data.random_consistency_index}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
