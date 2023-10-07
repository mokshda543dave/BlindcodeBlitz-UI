// release v1.0 commit
import React, { useState } from "react";
import "./styles/formstyle.css";
import Base from "../components/Base";
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import { LoginUser } from "../services/user-service";
import { doLogin, getCurrentUserProfile } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("status"))[0].status === 0) {
      navigate("/register");
    }
  }, [navigate]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //handle change
  const handleChange = (e, prop) => {
    setCredentials({ ...credentials, [prop]: e.target.value });
  };

  //submit form
  const submitForm = (e) => {
    e.preventDefault();
    if (
      credentials.username.trim() === "" ||
      credentials.password.trim() === ""
    ) {
      toast.error("Both username & password is required");
      return;
    }

    //submit data to server
    LoginUser(credentials)
      .then((res) => {
        doLogin(res, () => {
          toast.success("Login Successfull");
          if (getCurrentUserProfile() === "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Network Error" && error.name === "AxiosError") {
          window.location.reload(true);
        }
        toast.error("Login Failed : " + error.response.data.message);
        setCredentials({
          username: "",
          password: "",
        });
      });
  };

  return (
    <Base>
      <div className="basediv">
        <div className="formcard">
          <Form onSubmit={submitForm}>
            {/* <Label for="email">Username</Label> */}
            <input
              className="forminput"
              id="email"
              type="email"
              placeholder="YOUR EMAIL"
              onChange={(e) => handleChange(e, "username")}
              value={credentials.username}
            ></input>
            {/* <Label for="password">Password</Label> */}
            <input
              className="forminput"
              id="password"
              type="password"
              placeholder="YOUR PASSWORD"
              onChange={(e) => handleChange(e, "password")}
              value={credentials.password}
            ></input>
            <button className="forminput formbtn">REQUEST BLINDFOLD</button>
          </Form>
        </div>
      </div>
    </Base>
  );
};

export default Login;
