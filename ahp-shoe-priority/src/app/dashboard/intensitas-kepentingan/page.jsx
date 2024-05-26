"use client"
import { useState, useEffect } from "react";

export default function Page() {
    const [interests, setInterests] = useState([]);

    const getDataIntensitasKepentingan = async () => {
        try {
            const response = await fetch("/api/interest", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setInterests(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataIntensitasKepentingan();
    }, []);

    return (
        <>
            <h1 className="text-xl uppercase font-bold select-none">Intensitas Kepentingan</h1>

            <table className="w-full mt-6 select-none">
                <thead>
                    <tr>
                        <th className="text-center border p-2 w-[5%] border-black">No</th>
                        <th className="text-center border p-2 w-[30%] border-black">Intensitas Kepentingan</th>
                        <th className="text-center border p-2 border-black">Deskripsi</th>
                    </tr>
                </thead>

                <tbody>
                    {interests.reduce((uniqueInterests, interest, index) => {
                        const existingInterestIndex = uniqueInterests.findIndex(item => item.description === interest.description);

                        if (existingInterestIndex !== -1) {
                            uniqueInterests[existingInterestIndex].indexes.push(index + 1);
                        } else {
                            uniqueInterests.push({
                                description: interest.description,
                                interests: [interest.interest],
                                indexes: [index + 1]
                            });
                        }

                        return uniqueInterests;
                    }, []).map((uniqueInterest, uniqueIndex) => (
                        <tr key={uniqueIndex}>
                            <td className="text-center border p-2 border-black">{uniqueIndex + 1}</td>
                            <td className="text-center border p-2 border-black">{uniqueInterest.indexes.join(', ')}</td>
                            <td className="text-center border p-2 border-black">{uniqueInterest.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
