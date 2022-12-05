import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpMutation } from '../store/api';
import { useEffect, useState } from 'react';
import { eventTargetSelector as target, preventDefault } from '../store/utils';
import { showModal, updateField, SIGN_UP_MODAL } from '../store/userSlice';
import Notification from './Notification';
import { useNavigate, Link } from 'react-router-dom'

function SignupModal() {
    const dispatch = useDispatch()
    const { show, username, password } = useSelector(state => state.user)
    const modalClass = `modal ${show === SIGN_UP_MODAL ? 'is-active' : ''}`
    const [signUp, result] = useSignUpMutation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const field = useCallback(
        e => dispatch(updateField({ field: e.target.name, value: e.target.value })),
        [dispatch],
    )

    useEffect(() => {
        console.log(username, password)
        if (result.isSuccess) {
            navigate("/trivia/start")
        } else if (result.isError) {
            setError(result.error)
        }
    }, [navigate, result])

    return (
        <div>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.0/css/hover-min.css" />
            <section id="section-one">
                <div className="login-modal">
                    <div className={modalClass} key="signup-modal">
                        <div className="modal-content">
                            <div className="box content">
                                <div className="close-btn">
                                    <a href="#">×</a>

                                </div>
                                <h1>Sign Up</h1>
                                {error ? <Notification type="danger">{error.data.detail}</Notification> : null}
                                <form method="POST" onSubmit={preventDefault(signUp, () => ({
                                    username, password
                                }))}>
                                    <div className="field">
                                        <input required onChange={field} value={username} name="username" className="input" type="text" placeholder="Create Username" />
                                    </div>
                                    <div className="field">
                                        <input required onChange={field} value={password} name="password" className="input" type="password" placeholder="Create Password" />
                                    </div>
                                    <div className="field is-grouped">
                                        <input type="submit" name="login" defaultValue="Login" />
                                        <div className='myholder'>
                                            <h4>Already have an account?<Link to="/user/login">Login</Link></h4>
                                        </div>
                                    </div>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignupModal
