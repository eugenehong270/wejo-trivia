import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/api';
import { useEffect, useState } from 'react';
import { eventTargetSelector as target, preventDefault } from '../store/utils';
import { showModal, updateField, LOG_IN_MODAL } from '../store/userSlice';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom'

function LoginModal() {
  const dispatch = useDispatch();
  const {show, username, password } = useSelector(state => state.user);
  const modalClass = `modal ${show === LOG_IN_MODAL ? 'is-active' : ''}`;
  const [logIn, result] = useLoginMutation();
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const field = useCallback(
    e => dispatch(updateField({field: e.target.name, value: e.target.value})),
    [dispatch],
  );

  useEffect(() => {
    if (result.isSuccess) {
        navigate("/trivia/start");
    } else if (result.isError) {
        setError(result.error);
    }},[navigate, result])


  return (
    <div className={modalClass} key="login-modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box content">
          <h3>Log In</h3>
          { error ? <Notification type="danger">{error.data.detail}</Notification> : null }
          <form method="POST" onSubmit={preventDefault(logIn, target)}>
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

              <h4>Don't have an account? Signup now!</h4>

              <div className="control">
                <button className="button">Create Account</button>
              </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
