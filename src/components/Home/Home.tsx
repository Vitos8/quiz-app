import React from 'react'
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router";


const Home: React.FC = () => {
     let navigate = useNavigate();

     let toForm = () => {
          navigate('/Form');
     };

     return (
          <>
               <div className="  flex-grow-0 d-flex justify-content-center align-items-center flex-column">
                    <p className="text-center fs-4 text-light">A cool quiz with a variety of topics !</p> 
                    <Button onClick={toForm} className='fs-5 w-25 text-secondary' variant="warning"  style={{ marginTop: '80px'}} >Start</Button>
               </div>
          </>
     )
}

export default Home