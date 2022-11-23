import React from 'react'
import { showModal, LOG_IN_MODAL } from '../store/userSlice';
import { useDispatch } from 'react-redux';

import LoginModal from './LoginModal';

const LandingPage = () => {
  const dispatch = useDispatch()
  return (
    <>
      <LoginModal />
        <div>
          <button onClick={() => dispatch(showModal(LOG_IN_MODAL))} className="button is-light">
            Log in
          </button>
        </div>
    </>
  )
}

export default LandingPage
