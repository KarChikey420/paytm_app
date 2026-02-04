import { useState } from 'react'
import { Appbar } from './component/Appbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Appbar/>
    </>
  )
}

export default App
