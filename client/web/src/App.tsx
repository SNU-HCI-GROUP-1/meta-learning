import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checks from './pages/Checks';
import Editor from './pages/Editor';
import Home from './pages/Home';
import Questions from './pages/Questions';

function App() {
  const [answers, setAnswers] = React.useState<any[]>(Array(10).fill(null));
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='editor' element={<Editor />} />
        <Route path='questions' element={
          <Questions 
            answers={answers} 
            setAnswers={setAnswers}
          />
        } 
        />
        <Route path='checks' element={<Checks answers={answers} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
