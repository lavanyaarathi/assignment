import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
function App() {
  return (
    <div className="App">
     <Routes>
     <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
     </Routes>
       
    </div>
  );
}

export default App;
