import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checks from './pages/Checks';
import Editor from './pages/Editor';
import defaultContents from './pages/Editor/testDefault';
import Home from './pages/Home';
import Questions from './pages/Questions';
import testQuestions from './testQuestions';

export type Question = {
  question: string;
  answer: string;
};

function App() {
  const [answers, setAnswers] = React.useState<any[]>(Array(10).fill(null));
  const [questions, setQuestions] = React.useState<Question[]>(testQuestions);
  const [scripts, setScripts] = React.useState<string>(defaultContents);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
        <Home
          setScripts={setScripts}
        />
        } 
        />
        <Route path='editor' element={
          <Editor
            scripts={scripts}
            setScripts={setScripts}
            setQuestions={setQuestions}
          />
        } 
        />
        <Route path='questions' element={
          <Questions 
            answers={answers} 
            questions={questions}
            setAnswers={setAnswers}
          />
        } 
        />
        <Route path='checks' element={
          <Checks
            answers={answers} 
            questions={questions}
            text={scripts}
          />
        } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
