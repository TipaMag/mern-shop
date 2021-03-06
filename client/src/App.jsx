import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Header } from './components/Header/Header'
import { Pages } from './components/mainpages/Pages'
import { getRefreshToken } from './redux/auth-reducer'
import { getUserInfo } from './redux/user-reducer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { BackdropLoader } from './components/common/BackdropLoader'


export const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  // const initialized = useSelector(state => state.app.initialized)
  // if (!initialized) return <BackdropLoader color={'inherit'}/>

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if(token) dispatch(getRefreshToken())
  }, [dispatch])

  useEffect(() => {
    if(token?.length > 0) {
      dispatch(getUserInfo(token))
    }
  }, [dispatch, token])

  return (
    <div className="App">
      <Header/>
      <Pages/>
      
      <ToastContainer />
    </div>
  )
}