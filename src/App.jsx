import { Route, Routes } from 'react-router'
import { Home, Login, Register, Map } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/map' element={<Map/>}/>
    </Routes>
  )
}

export default App
