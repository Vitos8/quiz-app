import React,{useState} from 'react';
import axios from 'axios';
import { Container, Button} from 'react-bootstrap';
import {Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Forms from './components/Form/Form';
import Card from "./components/Card/Card";
import { Question, shuffleArray,QuestionsState } from './utils';
import { useNavigate } from "react-router";
import Alert from './components/Home/Alert';

export type AnswerObject = {
     question?: string;
     answer?: string;
     correct?: boolean;
     correctAnswer?: string;
};

let App: React.FC =() => {
     const [data, setData] = useState<QuestionsState[]>([]);
     const [isLoadnig, setIsLoading] = useState(false);
     const [number, setNumber] = useState(0);
     const[gameOver, setGameOver] = useState(false);
     const [score, setScore] = useState(0);
     const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
     const [show, setShow] = useState(false);
     let navigate = useNavigate();

     interface requestParams {
          category?: string;
          limit?: number;
          difficulty?: string;
     }

     let request = async (params:requestParams) => {
               setIsLoading(true);
               let res = await axios.get(`https://the-trivia-api.com/api/questions?categories=${params.category}&limit=${params.limit}&difficulty=${params.difficulty}`);
               let newData = res.data.map((question: Question) => ({
                    ...question,
                    answers: shuffleArray([...question?.incorrectAnswers, question?.correctAnswer])
               }))
               setData(newData);
               setIsLoading(false);
     }          
     
     let OnRequest = (data:any) => {
          request({
               category: data?.Topic,
               limit: data?.Limit, 
               difficulty: data?.Difficulty
               })
     };

     let checkAnswer = (e:any, choice:string) =>{
          if (!gameOver) {
               // User's answer
               const answer = choice;
               
               // Check answer against correct answer
               const correct = data[number].correctAnswer === answer;
               
               // Add score if answer is correct
               if (correct) setScore((prev) => prev + 1);
               // Save the answer in the array for user answers
               const answerObject = {
                    question: data[number].question,
                    answer,
                    correct,
                    correctAnswer: data[number].correctAnswer,
               };
               setUserAnswers((prev) => [...prev, answerObject]);
               
          }
     }

     
     let nullState = () => {
          setData([]);
          setNumber(0);
          setGameOver(false);
          setUserAnswers([]);
          setScore(0);
     }

     let nextQuestion = () => {
          if (number + 1 === data.length) {
               setShow(true);
          } else{
               let nextQ= number + 1;
               setNumber(nextQ);
          }
     }

     return (
          <div className="App">
               <Alert handleClose={() =>{ 
                    setShow(false)
                    nullState();
                    navigate("/");
                    }} 
                    show={show} 
                    score={score}/>
               <Container className='d-flex justify-content-center align-items-center flex-column pt-1 pb-5'>
                    <h1 className='display-1 my-4  '>REACT QUIZ</h1>
                    <Routes>
                         <Route path="/"  element={<Home/>} />
                         <Route path="/Form"  element={<Forms onRequest={OnRequest} />} />
                         <Route path="/Questions"  element={<Card 
                              score={score}
                              userAnswer={userAnswers ? userAnswers[number] : undefined}
                              category={data[number]?.category}
                              difficulty={data[number]?.difficulty}
                              callback={checkAnswer}
                              answers={data[number]?.answers}
                              question={data[number]?.question} 
                              totalQuestions={data.length} 
                              questionNr={number + 1} 
                              Loader={isLoadnig}
                         />
                         } />   
                    </Routes>
                    {!gameOver && userAnswers.length === number + 1 ? 
                    <Button onClick={nextQuestion}  className='fw-bold text-light mt-4' variant='warning'>{number + 1 !== data?.length  ? 'Next question' : 'Home'}</Button> 
                    : null}
               </Container>
               <footer className="position-absolute bottom-0 start-50 translate-middle-x text-primary fw-bold fs-3 mb-4">Created by Vitalik Golubovich</footer>
          </div>
     );
}

export default App;
