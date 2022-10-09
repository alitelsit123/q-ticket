import {useAtom} from 'jotai'
import {dialog as derivedDialog} from '../stores/app'
import { forwardRef, useRef } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialogs(props) {
  const {children} = props
  const [dialogg,setDialog] = useAtom(derivedDialog)  
  const _handleClose = () => {
    setDialog({
      open:false,
      title: null,
      data: []
    })
  }

  return (

    <Dialog fullScreen open={dialogg.open} 
    TransitionComponent={Transition}>
      <div className={'px-16 w-full bg-white z-10 py-8 shadow-lg border border-gray-300 rounded-tl-3xl rounded-tr-3xl'}>
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="font-black text-lg">{dialogg.title}</div>
          <button type="button" onClick={_handleClose} className="flex items-center justify-center bg-gray-300 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </Dialog>
  )
}