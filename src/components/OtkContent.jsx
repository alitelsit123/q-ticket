import { Box } from "@material-ui/core";


export default function OtkContent() {

  return (
    <Box>
      <div>
        <div className="text-gray-700">
          <div className="flex justify-start">
            <div className="w-[5%]">1.</div>
            <div className="w-[25%]">Nama Kegiatan</div>
            <div>: Pemeliharaan dan Perawatan Jaringan</div>
          </div>
          <div className="flex">
            <div className="w-[5%]">2.</div>
            <div className="w-[25%]">Pemilik Layanan</div>
            <div>: Sub Bidang Operasional Teknologi Komunikasi</div>
          </div>
          
          <div className="flex">
            <div className="w-[5%]">3.</div>
            <div className="w-[25%]">Deskripsi</div>
            <div className="break-words w-[70%] flex">
              <span className="mr-1">:</span> 
              <span>Memberikan layanan  kepada pegawai internal Pusjarkom untuk pencatatan digital apabila ada kerusakan sistem jarigan dan untuk melihat histori data yang sebelumnya telah terjadi yang ditangani oleh pegawai sub bidang Operasional Teknologi Komunikasi</span>
            </div>
          </div>

        </div>
        {/* 1.         : 
        2.     : 
        3.         :  */}
      </div>
    </Box>
  )
}