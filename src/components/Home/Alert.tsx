import React, {useState} from 'react'
import { Modal,Button } from 'react-bootstrap';
import { BooleanLiteral } from 'typescript';

interface Props {
     score: number;
     show: boolean;
     handleClose: () => void;
}

const Alert:React.FC<Props> = ({score,show, handleClose}) => {



     return (
          <>
               <Modal  show={show} onHide={handleClose} centered>
               <Modal.Header  closeButton>
                    <Modal.Title>Hey, your score is:  <span className='text-primary' > {score}</span>   </Modal.Title>
               </Modal.Header>
               <Modal.Footer className='d-flex justify-content-center '>
                    <Button className='w-50'  variant="primary" onClick={handleClose}>Ok</Button>
               </Modal.Footer>
          </Modal>
     </>
     )
}

export default Alert;