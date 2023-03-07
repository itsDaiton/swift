import { Route, Routes } from 'react-router'
import { Home, Login, Register, Map, Error } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/map' element={<Map/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
  )
}

export default App
