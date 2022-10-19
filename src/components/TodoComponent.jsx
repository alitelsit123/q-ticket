import {useAtom} from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { inspectNetwork as derivedInspectNetwork } from "../stores/app"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue, grey } from '@mui/material/colors';

export default function TodoComponent() {
  const [inspectNetwork] = useAtom(derivedInspectNetwork)
  const [items,setItems] = useState([])
  const [filteredItems,setFilteredItems] = useState([])
  const [headers,setHeaders] = useState([])
  const [filterDate,setFilterDate] = useState(new Date().toJSON().slice(0,10))

  const _handleFilterDate = (args) => {
    setFilterDate(args)
  }
  const updates = () => {
    if(filterDate) {
      const f = filterDate.split('-')
      const fR = parseInt(f[1], 10)+'/'+parseInt(f[2],10)+'/'+f[0]
      const filterResult = items.filter((item) => {
        return item['Tanggal Inspeksi'] == fR
      })
      setFilteredItems([...filterResult])
    } else {
      setFilteredItems([...items])
    }
  }
  useEffect(() => {
    if(inspectNetwork && inspectNetwork[0] && inspectNetwork[0][0]) {
      const keys = Object.values(inspectNetwork[0][0])
      const headerResult = []
      keys.map((item,index) => {
        headerResult.push(item)
      })
      setHeaders(headerResult)
      const values = Object.values(inspectNetwork[0])
      const itemResult = []
      values.map((item,index) => {
        const _n = {}
        Object.values(item).map((i,k) => {
          _n[headerResult[k]] = i
        })
        itemResult.push(_n)
      })
      setItems([...itemResult.slice(2)])
    } else {
      setHeaders([])
    }
  }, [])

  useEffect(() => {
    if(filterDate) {
      updates()
    } else {
      setFilteredItems([...items])
    }
  }, [filterDate])

  useEffect(() => {
    updates()
  }, [items])

  return (
    <div className='w-full'>
      <div className='font-black text-lg mb-2'>Filter</div>
      <div className='flex items-center space-x-3'>
        <div className='flex items-center'>
          <div className='mr-3'>Tanggal</div>
          <input type="date" id="" className='border px-3 py-1' value={filterDate} onChange={(e) =>  _handleFilterDate(e.target.value)} />  
        </div>
        <div>
          <button type='button' onClick={() => setFilterDate('')} className='bg-red-500 text-white px-3 py-1'>Reset</button>  
        </div>  
      </div>  
      <TableContainer component={Paper} className={'h-screen mt-4'}>
        <Table sx={{ 
          minWidth: 650,
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          "& .MuiTableCell-root": {
            borderLeft: "1px solid rgba(224, 224, 224, 1)"
          } 
        }} aria-label="simple table">
          <TableBody>
            <TableRow>
              {/* <TableCell sx={{fontWeight:'900'}}>Pelaksana Tugas</TableCell> */}
              <TableCell sx={{fontWeight:'900'}}>Tanggal</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Waktu</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Lokasi</TableCell>
              <TableCell sx={{fontWeight:'900'}}>SSID Wifi</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Test Internet</TableCell>
              <TableCell sx={{fontWeight:'900'}}>PIC</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Catatan Kendala</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Dokument Kegiatan</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {filteredItems.map((item,index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item['Tanggal Inspeksi']}</TableCell>
                  <TableCell component="th" scope="row">{item['Waktu Inspeksi']}</TableCell>
                  <TableCell component="th" scope="row">{item['Lokasi']}</TableCell>
                  <TableCell component="th" scope="row">{item['Wireless']}</TableCell>
                  <TableCell component="th" scope="row" sx={{width:'200px'}}>
                    <div>
                      <div className='flex justify-between'><span>Download</span><span>{item['Download']} Mbps</span></div>
                      <div className='flex justify-between'><span>Upload</span><span>{item['Upload']} Mbps</span></div>
                      <div className='flex justify-between'><span>Ping</span><span>{item['Ping']} Ms</span></div>
                      <div className='flex justify-between'><span>Packet Loss</span><span>{item['Packet Loss']} %</span></div>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item['PIC']}
                  </TableCell>
                  <TableCell component="th" scope="row">{item['Catatan kendala jaringan bila ada']}</TableCell>
                  <TableCell component="th" scope="row">
                    <ul>
                      {
                        item['Dokumen Kegiatan Inspeksi'].split(', ').map((e,i) => (
                          <li key={i}>
                            <a target={'_blank'} style={{color:blue[600]}} href={e}>{e}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}