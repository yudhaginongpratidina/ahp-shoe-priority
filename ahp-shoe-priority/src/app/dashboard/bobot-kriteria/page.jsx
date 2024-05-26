"use client"

import { MdAdd } from "react-icons/md";
import CreateKriteria from "./create-kriteria";

import { useState, useEffect } from "react";

export default function Page() {

    const [showFormCreateKriteria, setShowFormCreateKriteria] = useState(false);


    const handleShowFormCreateKriteria = (e) => {
        e.preventDefault();
        setShowFormCreateKriteria(!showFormCreateKriteria);
    }


    return (
        <div className="w-full h-screen">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-xl uppercase font-bold select-none">Bobot Kriteria</h1>

                <button onClick={handleShowFormCreateKriteria} className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 flex items-center gap-2.5">
                    <MdAdd className="text-xl" />Tambah Kriteria
                </button>
            </div>


            {/* ============================================================================= */}
            {/* FORM TAMBAH DATA KRITERIA */}
            {/* ============================================================================= */}
            {showFormCreateKriteria && <CreateKriteria showFormCreateKriteria={showFormCreateKriteria}  onClick={handleShowFormCreateKriteria}/>}


        </div>
    )
}