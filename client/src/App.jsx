import { Fragment, useState } from 'react'
import './App.css'
import Toolbar from './components/Toolbar/Toolbar'
import Settings from './components/Settings/Settings'
import Canvas from './components/Canvas/Canvas'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRef } from 'react'

function App() {

  const Content = () => {
    return (
      <>
        <Toolbar/>
        <Settings/>
        <Canvas/>
      </>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/:id' element={<Content/>}/>
        <Route path="*" element={<Navigate to={`/f${(+new Date).toString(16)}`}/>}/>
      </Routes>
    </div>
  )
}

export default App
