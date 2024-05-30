export default function Page() {
    return (
        <div>
            <div className="w-full h-[200px] bg-slate-900 flex flex-col justify-center items-start gap-4 p-5">
                <h1 className="text-3xl text-white font-semibold">🚀 Wellcome To Shoe Priority</h1>
                <button className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                    Lakukan Perhitungan
                </button>
            </div>


            <div className="w-full bg-blue-500 p-4 my-3 text-white">
                <h1 className="text-3xl font-bold">Tahap Pengembangan</h1>
            </div>
            <div className="w-full grid grid-cols-2 h-[150px] mt-5 gap-4">
                <div className="w-full bg-slate-950 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">0 Kriteria</h1>
                </div>
                <div className="w-full bg-slate-950 text-white flex justify-center items-center">
                    <h1 className="text-3xl font-semibold">0 Alternatif</h1>
                </div>
            </div>
        </div>
    )
}