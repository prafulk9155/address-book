import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes/Route';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <AppRoutes />
       
    </>
  )
}

export default App
