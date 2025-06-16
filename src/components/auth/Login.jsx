import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import mainbg from "../../assets/images/rm-cs-6.avif"
import Navbar from "../navbar/Navbar";

const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { session, signInUser, userRole } = UserAuth();
  // console.log("Login session ",session);

  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      

    try {
      const result = await signInUser(email, password);
      
      if (result.success && result.user.role === 'admin') {
        navigate("/admin");
      } else if(result.success && result.user.role === 'user'){
        navigate("/userdashboard")
      }
      setError("invalid details");
    } catch (err) {
      setError("an error occurred");
      console.log(err);
    }
  };

  return (
    // style={{backgroundImage: `url(${mainbg})`, backgroundPosition: 'center'}}
    <div  className="flex flex-col h-dvh w-dvw h-vh items-center justify-center bg-[#FAF9F6]">
      <Navbar />
      <div className=" rounded-[10px] p-8 shadow-xl bg-[#FBFCF8] relative">

          <h1 className="mb-4 font-semibold text-2xl text-center">
            Login Here
          </h1>
          {/* <Link className="absolute right-4 top-3 text-blue-700/70 hover:underline" to={"/userlogin"}>
            user?
          </Link> */}


        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {error && (
          <span className="text-red-500 text-center pt-4">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
