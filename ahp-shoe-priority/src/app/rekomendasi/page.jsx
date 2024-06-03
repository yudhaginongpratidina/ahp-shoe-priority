"use client"
import { useState, useEffect } from "react"
import ButtonComponent from "@/components/button_component";


export default function Page(){


    // USE STATE
    const [bobotKriteria, setBobotKriteria] = useState([]);
    const [bobotMerk, setBobotMerk] = useState([]);
    const [bobotHarga, setBobotHarga] = useState([]);
    const [bobotTujuan, setBobotTujuan] = useState([]);
    const [totalBobot, setTotalBobot] = useState(0);

    const [namaMerk, setNamaMerk] = useState("");
    const [hargaSepatu, setHargaSepatu] = useState("");
    const [tujuanPembelian, setTujuanPembelian] = useState("");
    const [message, setMessage] = useState("");

    const [rekomendasi, setRekomendasi] = useState([]);


    // DAPATKAN SEMUA DATA BOBOT
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


    const searchAlternative = async (e) => {
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

            const response = await fetch("/api/data-alternative?totalBobot=" + total, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            console.log(data);

            setMessage(data.message);
            setRekomendasi(data.data[0]);

            console.log("rekomendasi:", rekomendasi);

            // setTotalBobot(total);
            // const response = await fetch("/api/data-alternative?total_bobot=" + total,", {
            //     method: "GET",
            //     headers: { "Content-Type": "application/json" }
            // })

            // const data = await response.json();

            // setMessage(data.message);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        getAllBobot();
    }, []);


    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-screen-lg p-6 border shadow-md drop-shadow-md">
                <h1 className="text-5xl text-blue-500 font-bold text-center mb-6">SHOE PRIORITY</h1>

                <form onSubmit={searchAlternative} className="flex flex-col gap-4">
                    <div className="flex flex-center gap-4">
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="merk" className="text-sm">Merk Sepatu</label>
                            <select name="merk" id="merk" className="w-full border-none p-2 outline-none" value={namaMerk} onChange={(e) => setNamaMerk(e.target.value)} required>
                                <option value="">Pilih Merk</option>
                                {bobotMerk?.map(item => (
                                    <option key={item.id} value={item.merk}>{item.merk}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="merk" className="text-sm">Harga Sepatu</label>
                            <select name="merk" id="merk" className="w-full border-none p-2 outline-none" value={hargaSepatu} onChange={(e) => setHargaSepatu(e.target.value)} required>
                                <option value="">Pilih Harga</option>
                                {bobotHarga?.map(item => (
                                    <option key={item.id} value={item.harga}>{item.harga}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-1.5">
                            <label htmlFor="merk" className="text-sm">Tujuan</label>
                            <select name="merk" id="merk" className="w-full border-none p-2 outline-none" value={tujuanPembelian} onChange={(e) => setTujuanPembelian(e.target.value)} required>
                                <option value="">Pilih Harga</option>
                                {bobotTujuan?.map(item => (
                                    <option key={item.id} value={item.tujuan}>{item.tujuan}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <ButtonComponent type="submit" name="Cari" btnType="create" />
                </form>

                <div>
                    {rekomendasi && (
                        <div className="mt-6">
                            <h1 className="text-xl uppercase font-bold">Rekomendasi</h1>
                            <p className="text-sm">Merk Sepatu: {rekomendasi.namaModel}</p>
                            <p className="text-sm">Merk Sepatu: {rekomendasi.namaMerk}</p>
                            <p className="text-sm">Harga Sepatu: {rekomendasi.hargaSepatu}</p>
                            <p className="text-sm">Tujuan: {rekomendasi.tujuanPemilihan}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}