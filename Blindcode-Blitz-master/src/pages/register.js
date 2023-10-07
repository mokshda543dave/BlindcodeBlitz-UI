// release v1.0 commit
import React, { useState } from "react";
import Base from "../components/Base";
import { Form, FormGroup } from "reactstrap";
import { RegisterUser } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("status"))[1].status === 0) {
      navigate("/login");
    }
  }, [navigate]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "0",
    sem: "0",
  });

  //handle change
  const handleChange = (e, prop) => {
    setUserData({ ...userData, [prop]: e.target.value });
  };

  //submit form
  const submitForm = (e) => {
    e.preventDefault();
    RegisterUser(userData)
      .then((res) => {
        toast.success("Successfully Registered");
        setUserData({
          name: "",
          email: "",
          password: "",
          branch: "",
          sem: "0",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.name);
        toast.error(error.response.data.email);
        toast.error(error.response.data.password);
        toast.error(error.response.data.branch);
        toast.error(error.response.data.sem);
      });
  };

  return (
    <Base>
      <div className="basediv">
        <div className="formcard">
          <Form onSubmit={submitForm}>
            <FormGroup>
              <input
                id="name"
                type="text"
                placeholder="YOUR NAME"
                onChange={(e) => handleChange(e, "name")}
                value={userData.name}
                className="forminput"
              ></input>
            </FormGroup>
            <FormGroup>
              <input
                id="email"
                type="email"
                placeholder="YOUR EMAIL"
                onChange={(e) => handleChange(e, "email")}
                value={userData.email}
                className="forminput"
              ></input>
            </FormGroup>
            <FormGroup>
              <input
                id="password"
                type="password"
                placeholder="CREATE PASSWORD"
                onChange={(e) => handleChange(e, "password")}
                value={userData.password}
                className="forminput"
              ></input>
            </FormGroup>
            <FormGroup>
              <select
                id="branch"
                onChange={(e) => handleChange(e, "branch")}
                value={userData.branch}
                className="forminput"
              >
                <option disabled value={0}>
                  SELECT BRANCH
                </option>
                <option value={"MCA"}>MCA</option>
                <option value={"B.Tech"}>BTECH</option>
              </select>
            </FormGroup>
            <FormGroup>
              <select
                id="sem"
                onChange={(e) => handleChange(e, "sem")}
                value={userData.sem}
                className="forminput"
              >
                <option disabled value={0}>
                  SELECT SEMESTER
                </option>
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
                <option value={"5"}>5</option>
                <option value={"6"}>6</option>
                <option value={"7"}>7</option>
                <option value={"8"}>8</option>
              </select>
            </FormGroup>
            <button className="forminput formbtn">REGISTER</button>
          </Form>
        </div>
      </div>
    </Base>
  );
};

export default Register;
