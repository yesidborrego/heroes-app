import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const handleClickLogin = () => {
    dispatch({
      type: types.login,
      payload: {
        name: 'Isabella Borrego'
      }
    });
    const lastPatch = localStorage.getItem('lastPatch') || '/';
    history.replace(lastPatch);
  };

  return (
    <div className="container mt-5">
      <h1>Login Screen</h1>
      <hr/>
      <button
        className="btn btn-primary"
        onClick={handleClickLogin}
      >
        Login
      </button>
    </div>
  )
}
