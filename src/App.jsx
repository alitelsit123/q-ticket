import { useEffect, useState } from 'react'
import styles from './App.css'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import * as h from 'html-table-to-json'
import {user as derivedUser, inspectNetwork as derivedInspectNetwork, otk as derivedOtk,dialog as derivedDialog} from './stores/app'
import {useAtom} from 'jotai'
import Login from './components/Login'
import Home from './components/Home'
import Dialogs from './components/Dialog'
import TodoComponent from './components/TodoComponent'
import OtkCompoent from './components/OtkCompoent'

function App() {
  const apiKey = 'AIzaSyCfAYRncp4I3VdOgSJI9KB1U0kw_CjZW3Q'
  const spreadsheetId = '1vTjRTtfcIPWITcYk5deZjMosWLkXsmFMzPnh3SmdRHsjoKVWCeCB7axame6fPUCfuTFukH0Hbi6ZQwZ'
  const tabName = 'Form+Responses+1'
  const [,setOtk] = useAtom(derivedInspectNetwork)
  const [,setInspectNetwork] = useAtom(derivedOtk)
  const [user,setUser] = useAtom(derivedUser)
  const [dialog] = useAtom(derivedDialog)

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
    <div className="App w-full h-screen bg-blue-700 flex items-center justify-center">
      <div className='w-full h-[100vh] bg-white relative'>
        <div className='bg-blue-700 flex justify-between items-center px-8'>
          <div className='font-black p-4 text-white'>Inspeksi & Otk</div>
          <div className='flex items-center justify-between'>
            <button type='button' className='bg-white p-2 px-4 rounded-full flex items-center'>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg> */}
              <div className='ml-1'>{user.email}</div>
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
        <Home />
      </div>
    </div>
  )
}

export default App
