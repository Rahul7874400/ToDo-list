import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='bg-gray-700 text-white p-4 text-3xl'> TODO List Frontend </h1>
    </>
  )
}

export default App
