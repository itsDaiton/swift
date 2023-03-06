import { Provider } from 'react-redux'
import { Route, Router, Routes } from 'react-router'
import { store } from '../utils/store'
import { Home, Login, Register, Map } from './pages'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<Map/>}/>
      </Routes>
    </Provider>
  )
}

export default App
