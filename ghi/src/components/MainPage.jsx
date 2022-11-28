import React from 'react'
import { showModal, LOG_IN_MODAL } from '../store/userSlice';
import { useDispatch } from 'react-redux';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';



const MainPage = () => {
  const dispatch = useDispatch()
  return (
    <>
      <LoginModal />
      <SignupModal />
    </>
  )
}

export default MainPage
