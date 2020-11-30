import React from 'react'
import { useSelector } from 'react-redux'
import { Header } from './components/Header/Header'
import { Pages } from './components/mainpages/Pages'
import { BackdropLoader } from './components/common/BackdropLoader'


export const App = () => {
  const initialized = useSelector(state => state.app.initialized)

  // if (!initialized) return <BackdropLoader color={'inherit'}/>
  return (
    <div className="App">
      <Header/>
      <Pages/>
    </div>
  )
}