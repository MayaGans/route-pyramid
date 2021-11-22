import './Fab.css'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import WriteData from '../WriteData/WriteData'

const Fab = () => {

  const [isOpen, setIsOpen] = useState(false)

  return(
    <div>
    <button onClick={() => setIsOpen(true)} className="kc_fab_main_btn">+</button>

    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <WriteData/>
    </Modal>
    </div>

  )
}

export default Fab;