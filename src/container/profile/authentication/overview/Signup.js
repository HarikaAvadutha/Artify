import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { register } from '../../../../redux/authentication/actionCreator';
import { connect, useSelector, useReducer } from 'react-redux';

const SignUp = (props) => {
  const [state, setState] = useState({
    values: null,
    checked: null,
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  // handle form input
  const handleInput = (e) => {
    e.preventDefault()
    setState({ ...state, [e.targe.name]: "" })
  }

  // submit form value 
  const handleSubmit = values => {
    setState({ ...state, values });
    const data = {
      username: values.username,
      first_name: values.name,
      last_name: values.name.split(' ')[1],
      email: values.email,
      password: values.password
    }
    props.registerUser(data)
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };
 if(props.isAuthenticated){
   return (<Redirect to='admin'/>)
 }
  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading className="auth-txt" as="h3">
            Sign Up to <span className="color-secondary">Artify</span>
          </Heading>
          <Form.Item label={<label className="auth-text">Name</label>} className="auth-text" name="name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input value={state.name} placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="username"
            label={<label className="auth-text">Username</label>}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<label className="auth-text">Email Address</label>}
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label={<label className="auth-text">Password</label>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div style={{ color: "white" }} className="auth-form-action auth-text">
            <Checkbox style={{ color: "white" }}
              checked={state.checked}
              onChange={onChange}
            >
              <span style={{ color: "white" }}>
                Creating an account means you’re okay with our Terms of Service and Privacy Policy
              </span>
            </Checkbox>
          </div>
          <Form.Item>
            <Button disabled={!state.checked} className="btn-create" htmlType="submit" type="primary" size="large">
              Create Account
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login signin-social">
            <li>
              <a className="google-signup" href="/">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </a>
            </li>
            <li>
              <a className="facebook-sign" href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a className="twitter-sign" href="/">
                <TwitterOutlined />
              </a>
            </li>
          </ul> */}
        </Form>
      </div>
    </AuthWrapper>
  );
};
const mapStateToProps = state => {
  // debugger
  return {
    isAuthenticated:state.auth.isAuthenticated
  };
};

const mapStateToDispatch = dispatch => {
  // debugger
  return {
    registerUser: (data) =>
      dispatch(register(data)),

  };
};


export default connect(mapStateToProps, mapStateToDispatch,)(SignUp);
