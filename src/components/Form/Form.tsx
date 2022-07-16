import React, {useRef, useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router";

interface FormsProps{
     onRequest: (arg0: {})=> void
}

const Forms:React.FC<FormsProps> = ({onRequest}:FormsProps) => {
     const [topicValue, setTopicValue] = useState('general_knowledge');
     const [difficultyValue, setDifficultyValue] = useState('easy');
     const  Limit = useRef<HTMLInputElement>(null);
     const [rangeValue, setRangeValue] = useState(Limit?.current?.value);
     let navigate = useNavigate();


     const options = [
          {
               name: 'General Knowledge',
               value: 'general_knowledge',
               key: 1,
          },
          {
               name: 'Arts and Literature',
               value: 'arts_and_literature',
               key: 2,
          },
          {
               name: 'Film and TV',
               value: 'film_and_tv',
               key: 3,
          },
          {
               name: 'Food and Drink',
               value: 'food_and_drink',
               key: 4,
          },
          {
               name: 'Society and Culture',
               value: 'society_and_culture',
               key: 5,
          },
          {
               name: 'Sport and Leisure',
               value: 'sport_and_leisure',
               key: 6,
          },
          {
               name: 'Geography',
               value: 'geography',
               key: 7,
          },
          {
               name: 'History',
               value: 'history',
               key: 8,
          },
          {
               name: 'Music',
               value: 'music',
               key: 9,
          },
          {
               name: 'Science',
               value: 'science',
               key: 10,
          },
     ]

     let handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
          event.preventDefault();

          let data = {
               Topic: topicValue,
               Difficulty: difficultyValue,
               Limit: Limit?.current?.value,

          };

          navigate('/Questions');

          onRequest(data);
     }

     return (
          <Form  className='d-flex justify-content-center align-items-center flex-column ' onSubmit={handleSubmit}>
               <Form.Label className='fs-2 text-warning'>Сhoose a topic</Form.Label>
               <Form.Select value={topicValue}  onChange={(e) => setTopicValue(e.target.value)} className='mt-3 mb-5'  size="lg"  aria-label="Select Topic">
                    {options.map(item => (
                         <option key={item.key} value={item.value}>{item.name}</option>
                    ))}
               </Form.Select>
               <Form.Label className='fs-2 text-warning'>Сhoose difficulty</Form.Label>
               <Form.Select value={difficultyValue} onChange={(e) => setDifficultyValue(e.target.value)}  className='mt-3 mb-5'  size="lg" aria-label="Select Difficulty" >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
               </Form.Select>
               <Form.Label className='fs-2 text-warning mb-4' >Сhoose the number of questions</Form.Label>
               <p className='fs-5 text-dark'>{rangeValue ? rangeValue : 6 }</p>
               <Form.Range  className='mb-3 bg-light p-3 rounded'  onChange={() => setRangeValue(Limit?.current?.value)} ref={Limit} min='1' max='10'   />
               <Button   className='fs-5 mt-5' type="submit">Submit form</Button>
          </Form>
     )
}

export default Forms;