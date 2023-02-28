import { Route, Router, Routes } from 'react-router'
import { Home, Login, Register } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default App
