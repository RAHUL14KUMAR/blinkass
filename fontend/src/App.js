import logo from './logo.svg';
import './App.css';
import Login from './component/Login/Login';
import Register from './component/Register/Register'
import Upload from './component/upload/upload';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Upload/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
