import { useEffect, useState } from 'react'
import styles from './App.css'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import * as h from 'html-table-to-json'
import {user as derivedUser, inspectNetwork as derivedInspectNetwork, otk as derivedOtk,dialog as derivedDialog, baseDialog} from './stores/app'
import {useAtom} from 'jotai'
import Login from './components/Login'
import Home from './components/Home'
import Dialogs from './components/Dialog'
import TodoComponent from './components/TodoComponent'
import OtkCompoent from './components/OtkCompoent'
import BaseDialog from './components/BaseDialog'
import { Button } from '@material-ui/core'
import OtkContent from './components/OtkContent'
import TodoContent from './components/TodoContent'
import background_img from './assets/background.jpg'


function App() {
  const apiKey = 'AIzaSyCfAYRncp4I3VdOgSJI9KB1U0kw_CjZW3Q'
  const spreadsheetId = '1vTjRTtfcIPWITcYk5deZjMosWLkXsmFMzPnh3SmdRHsjoKVWCeCB7axame6fPUCfuTFukH0Hbi6ZQwZ'
  const tabName = 'Form+Responses+1'
  const [inspectNetwork,setOtk] = useAtom(derivedInspectNetwork)
  const [otk,setInspectNetwork] = useAtom(derivedOtk)
  const [user,setUser] = useAtom(derivedUser)
  const [dialog,setDialog] = useAtom(derivedDialog)
  const [_baseDialog,setBaseDialog] = useAtom(baseDialog)

  useEffect(() => {
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTuzzI6I83rhTvB8afMtOy3uydgfLtJqDV4CNVfPFnIssldZK1QKHljshxvdtgqEVN8bEwUBSckmuDK/pubhtml').then((_r) => {
      setOtk(h.parse(_r.data).results)
    })
    axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTjRTtfcIPWITcYk5deZjMosWLkXsmFMzPnh3SmdRHsjoKVWCeCB7axame6fPUCfuTFukH0Hbi6ZQwZ/pubhtml').then((_r) => {
      setInspectNetwork(h.parse(_r.data).results)
    })
  }, [])

  if(!user) {
    return <Login />
  }

  return (
    <div className="App w-full h-screen bg-blue-700 flex items-center justify-center relative">
      <img src={background_img} alt="" className={'absolute top-0 left-0 max-w-screen max-h-screen h-screen w-screen'} />
      <div className='w-full h-[100vh] bg-transparent relative'>
        <div className='flex justify-between items-center w-3/4 mx-auto'>
          <div className='font-black p-4 text-white'>Inspeksi & Otk</div>
          <div className='flex items-center justify-between bg-transparent'>
            <button type='button' className='bg-white p-2 px-4 rounded-full flex items-center'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg> */}
              <div className='ml-1 '>{user.email}</div>
            </button>
            <button type='button' className='p-4 text-white' onClick={() => {setUser(null)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </div>
        <Dialogs>
          {
            dialog.type === 'todo' &&
            <TodoComponent />
          }
          {
            dialog.type === 'otk' &&
            <OtkCompoent />
          }
        </Dialogs>
        <BaseDialog actions={
          <>
            {
              _baseDialog.type == 'todo' &&
              <>
                <Button style={{flexGrow:1,marginBottom:8}} color={'primary'} variant={'contained'} onClick={() => {}}>
                  <a style={{width:'100%',height:'100%'}} href="https://docs.google.com/forms/d/e/1FAIpQLSdN0VlLoLFxpDiSCQhu5k1f0kyFxQKC87TDZAR3VhHyQTLWMg/viewform?usp=sharing" target="_blank" rel="noopener noreferrer">
                    Form
                  </a>
                </Button>
                <Button onClick={() => {
                  setBaseDialog({open:false,title:'',type:''})
                  setDialog({
                    open: true,
                    type: 'todo',
                    title: 'LOGBOOK INSPEKSI JARINGAN',
                    data: inspectNetwork
                  })
                }} color={'primary'} variant={'contained'}>Log</Button>
              </>
            }
            {
              _baseDialog.type == 'otk' &&
              <>
                <Button style={{flexGrow:1,marginBottom:8}} onClick={() => {}} color={'primary'} variant={'contained'}>
                  <a style={{width:'100%',height:'100%'}} href="https://docs.google.com/forms/d/e/1FAIpQLSc29ltbo24_-YmSF8ZoA7Au2U75rJceEq9D9Dc9OTp-t1AWWQ/viewform?usp=sharing" target="_blank" rel="noopener noreferrer">
                    Form
                  </a>
                </Button>
                <Button onClick={() => {
                  setBaseDialog({open:false,title:'',type:''})
                  setDialog({
                    open: true,
                    type: 'otk',
                    title: 'LOGBOOK PEMELIHARAAN & PERAWAATAN JARINGAN',
                    data: otk
                  })
                }} color={'primary'} variant={'contained'}>Log</Button>
              </>
            }
          </>
        }>
          {
            _baseDialog.type == 'todo' &&
            <TodoContent />
          }
          {
            _baseDialog.type == 'otk' &&
            <OtkContent />
          }
        </BaseDialog>
        <Home />
      </div>
    </div>
  )
}

export default App
