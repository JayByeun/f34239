import React, { useState, JSX } from "react";
import Close from '../icons/Close';

const PrefillModal = ({open, onClose}: {open: boolean; onClose: () => void;}): boolean | JSX.Element => {
  return (open && (
    <div className='overlay'>
      <div className='modal'>
        <button className='close' onClick={onClose}>
            <Close />
        </button>
      </div>
    </div>
  ));
}

export default PrefillModal;
