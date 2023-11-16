import "./Fab.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import WriteData from "../WriteData/WriteData";

const Fab = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="kc_fab_main_btn">
        +
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <WriteData onClick={onClick} onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default Fab;
