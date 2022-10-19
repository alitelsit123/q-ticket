import {useAtom} from 'jotai'
import { useState } from 'react'
import {baseDialog, dialog as derivedDialog, inspectNetwork as derivedInspectNetwork, otk as derivedOtk, user} from '../stores/app'
import todo_img from '../assets/todo.png'
import { Box } from '@material-ui/core'
import logbook_img from '../assets/logbook.png'

export default function Home(props) {
  const [otk] = useAtom(derivedInspectNetwork)
  const [inspectNetwork] = useAtom(derivedOtk)
  const [,setDialog] = useAtom(derivedDialog)
  const [,setBaseDialog] = useAtom(baseDialog)

  return (
    <div className='w-[90vw] h-[90vh] mx-auto bg-transparent p-8'>
      <div className='flex justify-center space-x-16 p-16'>
        {/* <a href='https://docs.google.com/forms/d/e/1FAIpQLSdN0VlLoLFxpDiSCQhu5k1f0kyFxQKC87TDZAR3VhHyQTLWMg/viewform?usp=sharing' 
        className='h-[150px] w-[150px] border bg-gray-300 border-gray-300 rounded-full font-black flex items-center justify-center' target={'_blank'}>
          <span className='mx-auto text-center'>Form Inspect Network</span>
        </a>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSc29ltbo24_-YmSF8ZoA7Au2U75rJceEq9D9Dc9OTp-t1AWWQ/viewform?usp=sharing' 
        className='h-[150px] w-[150px] border bg-gray-300 border-gray-300 rounded-full font-black flex items-center justify-center' target={'_blank'}>Form Otk</a> */}

        <Box
        onClick={() => setBaseDialog({open: true,type: 'todo',title:'LOGBOOK INSPEKSI JARINGAN'})}
        className={`relative bg-white bg-center cursor-pointer h-[150px] w-[150px] border border-gray-300 rounded-full font-black flex items-center justify-center`} target={'_blank'}>
          <img src={todo_img} alt="" width={'80%'} height={'80%'} className={'z-10 absolute top-1/2 left-1/2'} style={{transform: 'translate(-50%,-50%)'}} />
        </Box>
        <Box
        onClick={() => setBaseDialog({open: true,type: 'otk',title:'LOGBOOK PEMELIHARAAN & PERAWAATAN JARINGAN'})}
        className='relative cursor-pointer h-[150px] w-[150px] border bg-white border-gray-300 rounded-full font-black flex items-center justify-center' target={'_blank'}>
          <img src={logbook_img} alt="" width={'80%'} height={'80%'} className={'z-10 absolute top-1/2 left-1/2'} style={{transform: 'translate(-50%,-50%)'}} />
        </Box>

      </div>
      {/* <div className='flex justify-center space-x-16'>
        <button type='button'
        onClick={() => setDialog({
          open: true,
          type: 'todo',
          title: 'Inspect Jaringan',
          data: inspectNetwork
        })} 
        className='h-[80px] w-[150px] border bg-gray-300 border-gray-300 font-black'>Inspect Network</button>
        <button type='button'
        onClick={() => setDialog({
          open: true,
          type: 'otk',
          title: 'Loogbook OTK',
          data: otk
        })} 
        className='h-[80px] w-[150px] border bg-gray-300 border-gray-300 font-black'>OTK</button>
      </div> */}
    </div>
  )
}