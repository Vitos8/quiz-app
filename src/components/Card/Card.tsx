import React from 'react';
import {Spinner, Button} from 'react-bootstrap';
import { AnswerObject } from '../../App';

interface Props {
     Loader: boolean;
     question: string;
     answers: string[];
     callback: (e: React.MouseEvent<HTMLButtonElement>, answer:string) => void;
     userAnswer: AnswerObject | undefined | any;
     questionNr: number;
     totalQuestions: number;
     category: string;
     difficulty: string;
     score: number;
}

const Card:React.FC<Props> = ({Loader, questionNr, totalQuestions, question, answers,callback, category, difficulty, score, userAnswer} ) => {     



     return (Loader ?
          <Spinner  animation="border" variant="success"  style={{ width: '3rem', height: '3rem', borderWidth: '6px' }} />  :
          <>
               <div className="d-flex   gap-5 mb-3">
                    <div className="d-flex justify-content-center align-items-center flex-column fs-4 fw-bold"><span className='text-warning'>Category :</span> {category}</div>
                    <div className="d-flex justify-content-center align-items-center flex-column fs-4 fw-bold"><span className='text-warning'>Difficulty :</span> {difficulty}</div>
               </div>
               <div className="fs-2 fw-bold mb-4"><span className='text-warning'>Score: </span> {score}</div>
               <div className="bc d-flex justify-content-center align-items-center flex-column  fw-bold">
                    <div className="mb-3 text-dark">{questionNr} / {totalQuestions}</div>
                    <div className="mb-3 text-dark "> {question}</div>
                    {answers.map((answer:string, index:number) => {
                         if (answer === userAnswer?.correctAnswer) {
                              return <Button onClick={(e) => callback(e, answer)} key={index} className='answer fs-6 fw-bold w-100 text-light mb-2 ' disabled={userAnswer ? true : false}  style={{background: 'green'}} >{answer}</Button>
                         }
                         if ( answer === userAnswer?.answer) {
                              return <Button onClick={(e) => callback(e, answer)} key={index} className='answer fs-6 fw-bold w-100 text-light mb-2 ' disabled={userAnswer ? true : false}  style={{background: 'red'}} >{answer}</Button>
                         }
                         return <Button onClick={(e) => callback(e, answer)} key={index} className='answer fs-6 fw-bold w-100 text-light mb-2  ' disabled={userAnswer ? true : false}  style={{background: ''}} >{answer}</Button>
                    })}
               </div>
          </>
     )
}

export default Card;