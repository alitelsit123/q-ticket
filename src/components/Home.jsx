import {useAtom} from 'jotai'
import {dialog as derivedDialog, inspectNetwork as derivedInspectNetwork, otk as derivedOtk, user} from '../stores/app'

export default function Home(props) {
  const [otk] = useAtom(derivedInspectNetwork)
  const [inspectNetwork] = useAtom(derivedOtk)
  const [,setDialog] = useAtom(derivedDialog)


  return (
    <div className='w-[90vw] h-[90vh] mx-auto bg-white p-8'>
      <div className='flex justify-center space-x-16 p-16'>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSdN0VlLoLFxpDiSCQhu5k1f0kyFxQKC87TDZAR3VhHyQTLWMg/viewform?usp=sharing' 
        className='h-[150px] w-[150px] border bg-gray-300 border-gray-300 rounded-full font-black flex items-center justify-center' target={'_blank'}>
          <span className='mx-auto text-center'>Form Inspect Network</span>
        </a>
        <a href='https://docs.google.com/forms/d/e/1FAIpQLSc29ltbo24_-YmSF8ZoA7Au2U75rJceEq9D9Dc9OTp-t1AWWQ/viewform?usp=sharing' 
        className='h-[150px] w-[150px] border bg-gray-300 border-gray-300 rounded-full font-black flex items-center justify-center' target={'_blank'}>Form Otk</a>
      </div>
      <div className='flex justify-center space-x-16'>
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
      </div>
    </div>
  )
}