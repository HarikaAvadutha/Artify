import actions from './actions';
import axios from 'axios';
import {API} from '../../config/api'

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr, registerBegin, registerSuccess, registerErr, userLoaded, userLoading, authErr } = actions;

const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch(userLoading());

  axios
    .get('http://localhost:3000/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch(userLoaded(res.data));
    })
    .catch((err) => {
      dispatch(authErr(err.response));
    });
};
// User Login
const login = (data) => (dispatch) => {

  // Headers
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      "Accept":"application/json"
    },
  };

  // Request Body
  const body = JSON.stringify(data);
   dispatch(loginBegin());  
  axios
    .post(`${API.auth.login}`, body, headers)
    .then((res) => {
        //Store user token and details
        localStorage.setItem('user_data',JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
      
    })
    .catch((err) => {
      dispatch(loginErr(err.response));
    });
};


const register = (data) => (dispatch) => {
  // Headers
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Accept':"application/json"
    },
  };

  // Request Body
  const body = JSON.stringify(data);

  dispatch(registerBegin());  
  axios
    .post(`${API.auth.signUp}`, body, headers)
    .then((res) => {
      dispatch(registerSuccess(res.data));
      //Store user token and details
      localStorage.setItem('user_data',JSON.stringify(res.data));
      
    })
    .catch((err) => {
      dispatch(registerErr(err.response.data));
    });
};

const logOut = () => (dispatch, getState) => {
  dispatch(logoutBegin());
  // Clear user data from local session
  localStorage.removeItem('user_data');
  localStorage.removeItem('token')
  dispatch(logoutSuccess(null));
};

const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};

export { login, logOut, register, loadUser, tokenConfig };
