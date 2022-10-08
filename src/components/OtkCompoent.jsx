import {useAtom} from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { otk as derivedOtk, user } from "../stores/app"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';

export default function OtkCompoent() {
  const [otk] = useAtom(derivedOtk)
  const [items,setItems] = useState([])
  const [headers,setHeaders] = useState([])
  const [_user] = useAtom(user)

  useEffect(() => {
    if(otk && otk[0] && otk[0][0]) {
      const keys = Object.values(otk[0][0])
      const headerResult = []
      keys.map((item,index) => {
        headerResult.push(item)
      })
      setHeaders(headerResult)
      const values = Object.values(otk[0])
      const itemResult = []
      values.map((item,index) => {
        const _n = {}
        Object.values(item).map((i,k) => {
          _n[k] = i
        })
        itemResult.push(_n)
      })
      const filtered = itemResult.slice(1).filter((item) => {
        return item[0] === _user.email
      })
      setItems([...filtered])
    } else {
      setHeaders([])
    }
  }, [])

  return (
    <div className='w-full'>
       <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                headers.map((item) => (
                  <TableCell key={item} sx={{fontWeight:'700'}}>{item}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {
                  Object.values(item).map((row,i) => {
                    if(i === 12) {
                      return (
                        <ul>
                        {
                          row.split(', ').map((e,_i) => (
                            <li key={_i}>
                              <a target={'_blank'} style={{color:blue[600]}} href={e}>{e}</a>
                            </li>
                          ))
                        }
                      </ul>
                      )
                    }
                    return (
                      <TableCell key={i} component="th" scope="row">{row}</TableCell>
                    )
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}