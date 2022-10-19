import { Box } from "@material-ui/core";

export default function TodoContent() {

  return (
    <Box>
      <div>
        <div className="text-gray-700">
          <div className="flex justify-start">
            <div className="w-[5%]">1.</div>
            <div className="w-[25%]">Nama Kegiatan</div>
            <div>: Inspeksi Jaringan</div>
          </div>
          <div className="flex">
            <div className="w-[5%]">2.</div>
            <div className="w-[25%]">Pemilik Layanan</div>
            <div>: Sub Bidang Operasional Teknologi Komunikasi</div>
          </div>
          
          <div className="flex">
            <div className="w-[5%]">3.</div>
            <div className="w-[25%]">Deskripsi</div>
            <div className="break-words w-[70%]">: Memberikan layanan kepada pegawai internal mengenai pencatatan secara digital dan melihat data lama mengenai kegiatan operasional harian inspeksi jaringan oleh pegawai sub bidang Operasional Teknologi Komunikasi</div>
          </div>

        </div>
      </div>
    </Box>
  )
}