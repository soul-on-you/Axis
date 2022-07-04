import React from "react";
import LoginForm from "../../components/login/LoginForm";

// import Icon from "@ant-design/icons";
import logo from "../../assets/Axis/Logo.svg";
import { Tabs, Typography } from "antd";

function Login() {
  //   const emailRef = useRef();
  //   const errRef = useRef();

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [errorMsg, setErrorMsg] = useState("");

  //   const navigate = useNavigate();

  //   const [fetch_login, { data, isLoading, error }] = useLoginMutation();
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     emailRef.current.focus();
  //   }, []);

  //   useEffect(() => {
  //     setErrorMsg("");
  //   }, [email, password]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const { data } = await fetch_login({
  //         variables: {
  //           email,
  //           password: password,
  //         },
  //       }).unwrap();

  //       console.log(data);
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // if (data) {
  //     //   dispatch(login(data));
  //     //   navigate("/");
  //     // }
  //   };

  //   const onFinish = (values) => {
  //     console.log("Success:", values);
  //   };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  // console.log(logo);
  return (
    <div
      style={{
        background: "#F0F2F5",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "90vh",
        minHeight: 600,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: 130,
          }}
        >
          {/* <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGnqvnJTHMfC.svg"
            alt="logo"
          /> */}
          {/* <Icon component={<img href={logo} alt="logo" />} /> */}
          <img src={logo} className="App-logo" alt="logo" />
          <Typography.Title level={2}>Axis View</Typography.Title>
        </div>
        <Typography.Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>
          Axis View is the new way of engeneer planning
        </Typography.Text>
      </div>
      <Tabs style={{ display: "flex", alignItems: "center" }}>
        <Tabs.TabPane tab="Login" key="login">
          <LoginForm />
        </Tabs.TabPane >
        <Tabs.TabPane tab="Sing Up" key="register">Registration</Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Login;

//<LoginForm
// onFinish={onFinish}
// onFinishFailed={onFinishFailed}
// autoComplete="off"
///>
