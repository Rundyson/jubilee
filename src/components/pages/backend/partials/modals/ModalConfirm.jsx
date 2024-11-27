import { Archive, X } from 'lucide-react'
import React from 'react'
import ModalWrapper from './ModalWrapper'
import { StoreContext } from '@/components/store/storeContext'
import { setIsConfirm, setIsDelete } from '@/components/store/storeAction'

const ModalConfirm = () => {
    const {dispatch} = React.useContext(StoreContext)

    const handleClose = () => {
      dispatch(setIsConfirm(false));
    }

  return (
    <>
        <ModalWrapper>

        

            <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full rounded-md border border-line">

                <div className="modal-header flex gap-2 p-2 items-center border-b border-light mb-2">
                    <Archive size={16} stroke='yellow'/> <span className='text-warning'>Archive</span>
                    <button className="ml-auto" onClick={handleClose}><X/></button>
                </div>

                <div className="modal-body p-2 py-4">
                    <p className="mb-0 text-center">Are you sure you want to archive this movie?</p>

                    <div className='flex justify-end gap-3 mt-5 text-[14px]'>
                        <button className='btn btn-warning' type='submit'>Archive</button>
                        <button className='btn btn-cancel' type='reset' onClick={handleClose}>Cancel</button>
                    </div>

                </div>

            </div>


            </ModalWrapper>
    </>
  )
}

export default ModalConfirm