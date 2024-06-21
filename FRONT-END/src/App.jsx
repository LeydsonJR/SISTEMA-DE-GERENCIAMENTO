import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SchoolPage from './pages/SchoolPage';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import SchoolListPage from './pages/SchoolListPage';
import StudentListPage from './pages/StudentListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/schools" element={<SchoolPage />} />
        <Route path="/teachers" element={<TeacherPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/school-list" element={<SchoolListPage />} />
        <Route path="/student-list" element={<StudentListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
