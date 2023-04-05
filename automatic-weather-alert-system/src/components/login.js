import { Row, Col, Card, Form, Input, Button, message, Spin } from "antd";
import React, { useState } from "react";
import login from "../media/login.png";
import styled from "styled-components";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    if (username == "" || null) {
      message.error("Username is empty");
    } else if (password == "" || null) {
      message.error("Password is Empty");
    } else {
      axios
        .post("https://webgramserver.com/app/api/login/", {
          username: username,
          password: password,
        })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  return (
    <Container>
      <LoginCard>
        <h2>Welcome !</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={handleUserChange}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <h4>
              <a>Forgot Password ?</a>
            </h4>
          </Form.Item>

          <Form.Item>
            <SignInButton
              type="primary"
              htmlType="submit"
              onSubmit={handleSubmit}
            >
              Sign in
            </SignInButton>
          </Form.Item>
        </Form>
      </LoginCard>
    </Container>
  );
};
export default Login;

export const SignInButton = styled(Button)`
  border-radius: 20px;
  width: 100%;
`;
export const LoginCard = styled(Card)`
  width: 25%;
  height: 65%;
  margin-top: 10vh;
  @media (max-width: 480px) {
    width: 70%;
    height: 50%;
    margin-top: 25vh;
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #50a3f9;
  background: -webkit-radial-gradient(top left, #50a3f9, #025766);
  background: -moz-radial-gradient(top left, #50a3f9, #025766);
  background: radial-gradient(to bottom right, #50a3f9, #025766);
`;
