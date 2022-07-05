import React, { useEffect, useRef, useState } from "react";
import {
  LockOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Result,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
// import { Link, useLocation } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/AuthApi";
import { blue } from "../UI/colors";

const RegisterForm = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const emailRef = useRef();
//   const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const navigate = useNavigate();
  //   const location = useLocation();

  const [fetch_register, { /*data,*/ isLoading /*, error*/ }] =
    useRegisterMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async ({ email, student_id, password }) => {
    // setErrorMsg("");
    try {
      const response = await fetch_register({
        email,
        serialNumber: student_id,
        password,
      }).unwrap();

      //   dispatch(login({ accessToken, ...jwt_decode(accessToken) }));
      //   setSuccessMsg(response.message);
      setSuccess(true);
      navigate("/"); //{ replace: true }
    } catch (err) {
      console.error(err.data);
      if (!err?.status) {
        // setErrorMsg("No server response!");
        message.error("Сервер не отвечает!", 5);
      } else if (err.status === 400) {
        // setErrorMsg(`Invalid fields data. ${err.data.errors[0].msg}!`);
        message.error(
          `Неверный формат данных. ${
            err.data.errors[0].param === "email"
              ? `Электронная почта задана неверно`
              : err.data.errors[0].param === "password"
              ? `Пороль не может быть короче 6 символов`
              : err.data.errors[0].param === "serialNumber"
              ? "Номер студенческого билета не может быть короче 6 символов"
              : "Неизвестная ошибка"
          }!`,
          5
        );
      } else if (err.status === 409) {
        // setErrorMsg(`${err.data.message}!`);
        message.error(
          `Ошибка регистрации. Пользователь c мейлом ${email} уже существует!`,
          5
        );
      } else {
        // setErrorMsg(`Registration failed. ${err.data.message}!`);
        message.error(`Registration failed. ${err.data.message}!`, 5);
      }
    }
  };

  return (
    <Row justify="space-around" align="middle">
      <Col
        className={styles.register_form}
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
          {isSuccess ? (
            <Result
              status="success"
              title="Пользователь успешно зарегистрирован"
              //   subTitle="Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button
                  type="primary"
                  key="login_route"
                  onClick={() => setActiveTab("login")}
                >
                  Go Log In
                </Button>,
                // <Button key="buy">Buy Again</Button>,
              ]}
            />
          ) : (
            <>
              <Typography.Title level={1} style={{ textAlign: "center" }}>
                Registration
              </Typography.Title>

              {/* <Alert
                style={{ display: errorMsg ? "block" : "none" }}
                message={errorMsg}
                type="error"
              /> */}

              <Spin spinning={isLoading}>
                <Form
                  style={{ minWidth: "300px" }}
                  form={form}
                  // wrapperCol={{ span: 10, offset: 7 }}
                  name="dynamic_rule"
                  // className={styles.register_form}
                  autoComplete="off"
                  autoCapitalize="off"
                  initialValues={{
                    remember: false,
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
                      className={styles.input}
                      prefix={<UserOutlined style={{ color: blue.primary }} />}
                      placeholder="Email"
                      ref={emailRef}
                    />
                  </Form.Item>
                  <Form.Item
                    name="student_id"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <SolutionOutlined style={{ color: blue.primary }} />
                      }
                      placeholder="Student ID number"
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
                      prefix={<LockOutlined style={{ color: blue.primary }} />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.register_form_button}
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                </Form>
              </Spin>
            </>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default RegisterForm;
