import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.scss';
import { CoachPage } from "./CoachPage";
import { StudentPage } from "./StudentPage";

const App = () => {
  return (
    <BrowserRouter>
        <h1>Scheduling Platform Demo</h1>
        <nav>
            <span className='navbtn'>
                <Link to="/coach">Coach</Link>
            </span>
            <span className='navbtn'>
                <Link to="/student">Student</Link>
            </span>
        </nav>
        <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/student" element={<StudentPage />} />
        </Routes>
    </BrowserRouter>
  )
}

const SplashPage = () => {
  return (
    <div>
      <h2>Welcome to the Scheduling Platform</h2>
      <p>
        This is a simple scheduling platform that allows students to book slots with coaches.
        <br/>To begin, please indicate whether you are a coach or a student.
      </p>
    </div>
  )
}

export default App
