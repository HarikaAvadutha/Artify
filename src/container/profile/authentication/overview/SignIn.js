import React, { useState, useCallback } from 'react';
import { Link, NavLink, useHistory,Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const SignIn = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const hasError = useSelector(state => state.auth.error);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
    name :""
  });

  // state global variable
// submit form value
  const handleSubmit = (value) => {
  dispatch(login(value));
  // history.push('/user');
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  if(isAuthenticated){
    // return(<Redirect to='/user'/>)
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const role = userData.user.groups.length>0?userData.user.groups[0].name:"";
    if(role=='specialist')
    {
      return(<Redirect to='/admin'/>)
    }
    else{
      return(<Redirect to='/admin/users/upload'/>)
    }
  }

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading  className = "auth-txt" as="h3">
            Sign in to <span className="color-secondary">Artify</span>
          </Heading>
          <Form.Item
            name="username"
            className="auth-txt"
            rules={[{ message: 'Please input your username', required: true }]}
              label= {<label className="auth-txt">Username</label>}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item className ="auth-txt"
             name="password"
             rules={[{message:"Please enter password", requird:true}]}
              label= {<label className="auth-txt">Password</label>}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {hasError&&<small style={{color:"red"}}>{hasError.data.non_field_errors[0]}</small>}
          <div className="auth-form-action">
            <Checkbox onChange={onChange}
              checked={state.checked}
            >
              <span className="auth-txt">
                Keep me logged in
              </span>
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p> */}
          {/* <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
          {/*  */}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
