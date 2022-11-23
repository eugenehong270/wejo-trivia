import React from 'react'
import { showModal, LOG_IN_MODAL } from '../store/userSlice';
import { useDispatch } from 'react-redux';

import LoginModal from './LoginModal';

const LandingPage = () => {
  const dispatch = useDispatch()
  return (
    <>
      <LoginModal />
    </>
  )
}

export default LandingPage
