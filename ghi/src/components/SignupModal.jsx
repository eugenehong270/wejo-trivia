import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpMutation } from '../store/api';
import { useEffect, useState } from 'react';
import { eventTargetSelector as target, preventDefault } from '../store/utils';
import { showModal, updateField, SIGN_UP_MODAL } from '../store/userSlice';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom'

function SignupModal() {
  const dispatch = useDispatch()
  const {show, username, password } = useSelector(state => state.user)
  const modalClass = `modal ${show === SIGN_UP_MODAL ? 'is-active' : ''}`
  const [signUp, result] = useSignUpMutation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const field = useCallback(
    e => dispatch(updateField({field: e.target.name, value: e.target.value})),
    [dispatch],
  )

    useEffect(() => {
        console.log(username, password)
        if (result.isSuccess) {
            navigate("/trivia/start")
        } else if (result.isError) {
            setError(result.error)
        }}, [navigate, result])

    return (
        <div className={modalClass} key="signup-modal">
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className="box content">
            <h3>Sign Up</h3>
            { error ? <Notification type="danger">{error.data.detail}</Notification> : null }
            <form method="POST" onSubmit={preventDefault(signUp, () => ({
               username, password
            }))}>
                <div className="field">
                <label className="label" htmlFor="username">Username</label>
                <div className="control">
                    <input required onChange={field} value={username} name="username" className="input" type="text" placeholder="username" />
                </div>
                </div>
                <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input required onChange={field} value={password} name="password" className="input" type="password" placeholder="secret..." />
                </div>
                </div>
                <div className="field is-grouped">


                <div className="control">
                    <button className="button is-primary">Submit</button>
                </div>


                <div className="control">
                    <button
                    type="button"
                    onClick={() => dispatch(showModal(null))}
                    className="button">Cancel</button>

                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    );


}

export default SignupModal
