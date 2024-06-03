"use client"
import { useState, useEffect } from "react";
import TextFieldComponent from "@/components/textfield_component";
import ButtonComponent from "@/components/button_component";
import { FaListUl } from "react-icons/fa6";
import { useRouter } from 'next/navigation'

export default function Page() {

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

            // console.log(data.bobot_kriteria);
        } catch (error) {
            console.log(error);
        }
    };

    const insertAlternative = async (e) => {
        e.preventDefault();

        try {
            let total = 0;
            // Menghitung total bobot alternatif
            if (namaMerk && hargaSepatu && tujuanPembelian) {


                const bobot_kriteria_merk = Number(bobotKriteria.find((item) => item.kriteria === "Merk").bobot_akhir);
                const bobot_kriteria_harga = Number(bobotKriteria.find((item) => item.kriteria === "Harga").bobot_akhir);
                const bobot_kriteria_tujuan = Number(bobotKriteria.find((item) => item.kriteria === "Tujuan").bobot_akhir);

                const selectedMerk = bobotMerk.find((item) => item.merk === namaMerk);
                const selectedHarga = bobotHarga.find((item) => item.harga === hargaSepatu);
                const selectedTujuan = bobotTujuan.find((item) => item.tujuan === tujuanPembelian);


                // BOBOT
                const bobot_merk = Number(selectedMerk.bobot_akhir);
                const bobot_harga = Number(selectedHarga.bobot_akhir);
                const bobot_tujuan = Number(selectedTujuan.bobot_akhir);

                const total_bobot = (bobot_merk * bobot_kriteria_merk) + (bobot_harga * bobot_kriteria_harga) + (bobot_tujuan * bobot_kriteria_tujuan);
                total = total_bobot;

                setTotalBobot(total);


                // ---------------------------------------------------------------------------------------------------------------------------------
                // DEBUGGING
                // ---------------------------------------------------------------------------------------------------------------------------------
                // const totalBobotMerk = Number(selectedMerk.bobot) * Number(bobotKriteria.find((item) => item.kriteria === "Merk").bobot_akhir);
                // const totalBobotHarga = Number(selectedHarga.bobot) * Number(bobotKriteria.find((item) => item.kriteria === "Harga").bobot_akhir);
                // const totalBobotTujuan = Number(selectedTujuan.bobot) * Number(bobotKriteria.find((item) => item.kriteria === "Tujuan").bobot_akhir);

                // console.log("bobot_kriteria_merk:", bobot_kriteria_merk);
                // console.log("bobot_kriteria_harga:", bobot_kriteria_harga);
                // console.log("bobot_kriteria_tujuan:", bobot_kriteria_tujuan);

                // console.log("selectedMerk:", selectedMerk);
                // console.log("selectedHarga:", selectedHarga);
                // console.log("selectedTujuan:", selectedTujuan);

                // console.log("totalBobotMerk:", bobot_merk);
                // console.log("totalBobotHarga:", bobot_harga);
                // console.log("totalBobotTujuan:", bobot_tujuan);

                console.log("total_bobot:", total);

                // console.log("totalBobot:", totalBobot);
            }

            setTotalBobot(total);
            const response = await fetch("/api/data-alternative", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    namaModel: namaModel,
                    namaMerk: namaMerk,
                    hargaSepatu: hargaSepatu,
                    tujuanPembelian: tujuanPembelian,
                    totalBobot: total
                })
            })

            const data = await response.json();

            setMessage(data.message);
            setTimeout(() => {
                router.push("/dashboard/data-alternative");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBobot();
    }, []);

    return (
        <div className="w-full h-screen select-none">
            <h1 className="text-xl uppercase font-bold select-none mb-6">Tambah Data Alternative</h1>

            {/* ============================================================================= */}
            {/* PESAN                                                                         */}
            {/* ============================================================================= */}
            {message && (
                <div className="mb-5 p-2 w-full bg-green-500">
                    <p className="text-sm text-white">{message}</p>
                </div>
            )}
            <form onSubmit={insertAlternative}>
                <TextFieldComponent
                    id="nama_model"
                    name="Nama Model"
                    required={true}
                    value={namaModel}
                    onChange={(e) => setNamaModel(e.target.value)}
                />
                <div className="relative flex flex-col gap-2 mb-5">
                    <label htmlFor="merk" className="text-md text-gray-500 capitalize">Merk Sepatu</label>
                    <div className="flex border-2">
                        <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                        <select name="merkSepatu" id="merkSepatu" className="w-full border-none p-2 outline-none" value={namaMerk} onChange={(e) => setNamaMerk(e.target.value)} required>
                            <option value="">=== Pilih Merk Sepatu ===</option>
                            {bobotMerk?.map(item => (
                                <option key={item.id} value={item.merk}>{item.merk}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="relative flex flex-col gap-2 mb-5">
                    <label htmlFor="harga_sepatu" className="text-md text-gray-500 capitalize">Harga Sepatu</label>
                    <div className="flex border-2">
                        <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                        <select name="hargaSepatu" id="hargaSepatu" className="w-full border-none p-2 outline-none" value={hargaSepatu} onChange={(e) => setHargaSepatu(e.target.value)} required>
                            <option value="">=== Pilih Harga Sepatu ===</option>
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
                        <select name="tujuan" id="tujuan" className="w-full border-none p-2 outline-none" value={tujuanPembelian} onChange={(e) => setTujuanPembelian(e.target.value)} required>
                            <option value="">=== Pilih Tujuan ===</option>
                            {bobotTujuan?.map(item => (
                                <option key={item.id} value={item.tujuan}>{item.tujuan}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <ButtonComponent type="submit" name="Simpan Data Alternative" btnType="create" />
            </form>
            {/* <h1>Total Bobot : {totalBobot}</h1> */}
        </div>
    )
}
