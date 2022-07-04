// import { Button, Checkbox, Form, Input } from "antd";
// import React from "react";

// function LoginForm() {
//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Username"
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: "Please input your username!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Password"
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: "Please input your password!",
//           },
//         ]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item
//         name="remember"
//         valuePropName="checked"
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Checkbox>Remember me</Checkbox>
//       </Form.Item>

//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }

// export default LoginForm;

import React, { useEffect, useRef, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/AuthApi";
import { login } from "../../store/slices/AuthSlice";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const [form] = Form.useForm();

  const emailRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [fetch_login, { /*data,*/ isLoading /*, error*/ }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async ({ email, password }) => {
    setErrorMsg("");
    try {
      const {accessToken} = await fetch_login({
        email,
        password,
      }).unwrap();

      console.log(accessToken);

      dispatch(login({ accessToken, ...jwt_decode(accessToken) }));
      //   console.log(location);
      navigate(location.state ? location.state.from.pathname : "/");
    } catch (err) {
      console.error(err.data);
      if (!err?.status) {
        setErrorMsg("No server response!");
      } else if (err.status === 400) {
        setErrorMsg(`Invalid email or password. ${err.data.errors[0].msg}!`);
      } else if (err.status === 401) {
        setErrorMsg(`Unauthorized. ${err.data.message}!`);
      } else {
        setErrorMsg(`Login failed. ${err.data.message}!`);
      }
    }
  };

  //   const onFinish = (values) => {
  //     console.log(form.getFieldsValue());
  //     console.log(form);
  //     form.setFieldsValue({ username: "", password: "" });
  //     console.log("Received values of form: ", values);
  //   };

  return (
    <Row justify="space-around" align="middle">
      <Col
        className={styles.login_form}
        // xs={20}
        // sm={16}
        // md={12}
        // lg={10}
        // xl={10}
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ display: "flex", justifyItems: "center" }}
        >
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Login in System
          </Typography.Title>

          <Alert
            style={{ display: errorMsg ? "block" : "none" }}
            message={errorMsg}
            type="error"
          />

          <></>
          <Spin spinning={isLoading}>
            <Form
              form={form}
              // wrapperCol={{ span: 10, offset: 7 }}
              name="dynamic_rule"
              // className={styles.login_form}
              autoComplete="off"
              autoCapitalize="off"
              initialValues={{
                remember: false, //true если надо запоминать юзера
              }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  ref={emailRef}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link to={"/"}>Forgot password?</Link>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.login_form_button}
                >
                  Log in
                </Button>
                {/* Or <a href="">register now!</a> */}
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </Form>
          </Spin>
        </Space>
      </Col>
    </Row>
  );
};

export default LoginForm;

// import { Button, Checkbox, Form, Input } from "antd";
// import { useEffect, useState } from "react";
// const formItemLayout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 8,
//   },
// };
// const formTailLayout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 8,
//     offset: 4,
//   },
// };

// const LoginFormV2 = () => {
//   const [form] = Form.useForm();
//   const [checkNick, setCheckNick] = useState(false);

//   useEffect(() => {
//     form.validateFields(["nickname"]);
//   }, [checkNick, form]);

//   const onCheckboxChange = (e) => {
//     setCheckNick(e.target.checked);
//   };

//   const onCheck = async () => {
//     try {
//       //   console.log(form);
//       const values = await form.validateFields();
//       console.log("Success:", values);
//     } catch (errorInfo) {
//       console.log("Failed:", errorInfo);
//     }
//   };

//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <Form
//       form={form}
//     //   onFinish={onFinish}
//     //   onFinishFailed={onFinishFailed}
//       name="dynamic_rule"
//     >
//       <Form.Item
//         {...formItemLayout}
//         name="username"
//         label="Name"
//         rules={[
//           {
//             required: true,
//             message: "Please input your name",
//           },
//         ]}
//       >
//         <Input placeholder="Please input your name" />
//       </Form.Item>
//       <Form.Item
//         {...formItemLayout}
//         name="nickname"
//         label="Nickname"
//         rules={[
//           {
//             required: checkNick,
//             message: "Please input your nickname",
//           },
//         ]}
//       >
//         <Input placeholder="Please input your nickname" />
//       </Form.Item>
//       <Form.Item {...formTailLayout}>
//         <Checkbox checked={checkNick} onChange={onCheckboxChange}>
//           Nickname is required
//         </Checkbox>
//       </Form.Item>
//       <Form.Item {...formTailLayout}>
//         <Button type="primary" onClick={onCheck}>
//           Check
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default LoginFormV2;
