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
  const [headers,setHeaders] = useState([])

  useEffect(() => {
    if(inspectNetwork && inspectNetwork[0] && inspectNetwork[0][0]) {
      const keys = Object.values(inspectNetwork[0][0])
      const headerResult = []
      keys.map((item,index) => {
        headerResult.push(item)
      })
      setHeaders(headerResult)
      const _v = inspectNetwork[0].slice(2)
      const values = Object.values(_v).map((item) => {
        var newItem = {}
        const vals = Object.values(item)
        vals.map((i,index) => {
          newItem[headerResult[index]] = i
        })
        return {...newItem}
      })
      setItems(values)
    } else {
      setHeaders([])
    }
  }, [])
  return (
    <div className='w-full'>
       <TableContainer component={Paper} className={'h-screen'}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              {/* <TableCell sx={{fontWeight:'900'}}>Pelaksana Tugas</TableCell> */}
              <TableCell rowSpan={2} sx={{fontWeight:'900'}}>Tanggal</TableCell>
              <TableCell rowSpan={2} sx={{fontWeight:'900'}}>Waktu</TableCell>
              <TableCell colSpan={3} sx={{fontWeight:'900',minWidth:'600px'}}>Kondisi Jaringan</TableCell>
              <TableCell colSpan={2} sx={{fontWeight:'900',minWidth: '300px'}}>PIC</TableCell>
              <TableCell rowSpan={2} sx={{fontWeight:'900'}}>Lokasi</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Catatan Kendala</TableCell>
              <TableCell sx={{fontWeight:'900'}}>Dokument Kegiatan</TableCell>
            </TableRow>
          </TableBody>
          <TableBody sx={{borderBottom:'1px solid '+grey[300]}}>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell sx={{fontWeight:'700'}}>Nama</TableCell> */}
              <TableCell sx={{fontWeight:'700'}}></TableCell>
              <TableCell sx={{fontWeight:'700'}}></TableCell>
              <TableCell sx={{fontWeight:'700'}}>LAN</TableCell>
              <TableCell sx={{fontWeight:'700'}}>Wireless</TableCell>
              <TableCell sx={{fontWeight:'700'}}>Test Internet</TableCell>
              <TableCell sx={{fontWeight:'700'}}>Nama</TableCell>
              <TableCell sx={{fontWeight:'700'}}></TableCell>
              <TableCell sx={{fontWeight:'700'}}></TableCell>
              <TableCell sx={{fontWeight:'700'}}></TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {items.map((item,index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item['Tanggal Inspeksi']}</TableCell>
                  <TableCell component="th" scope="row">{item['Waktu Inspeksi']}</TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row" sx={{width:'200px'}}>
                    <div>
                      <div className='flex justify-between'><span>Download</span><span>{item['Download']} Mbps</span></div>
                      <div className='flex justify-between'><span>Upload</span><span>{item['Upload']} Mbps</span></div>
                      <div className='flex justify-between'><span>Ping</span><span>{item['Ping']} Mbps</span></div>
                      <div className='flex justify-between'><span>Packet Loss</span><span>{item['Packet Loss']} Mbps</span></div>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <div className='flex justify-between'><span>PIC 1</span><span>{item['PIC 1']}</span></div>
                      <div className='flex justify-between'><span>PIC 2</span><span>{item['PIC 2']}</span></div>
                      <div className='flex justify-between'><span>PIC 3</span><span>{item['PIC 3']}</span></div>
                      <div className='flex justify-between'><span>PIC 4</span><span>{item['PIC 4']}</span></div>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row"></TableCell>
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