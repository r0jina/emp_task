import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import saveToken from "../useToken";
import { empValidation } from "../common/validation";
import { Grid } from "@mui/material";
import Input from "antd/es/input/Input";
import { Eye, EyeSlash } from "phosphor-react";

async function login(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // const passwordValidate = (password) => {
  //   // @$!%*#?&
  //   let passRex =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  //   if (password === "" || password === undefined) {
  //     return {
  //       result: false,
  //       msg: "Password is Required",
  //     };
  //   } else if (password.length < 8) {
  //     return {
  //       result: false,
  //       msg: "Password must be at least 8 length",
  //     };
  //   } else if (!passRex.test(password)) {
  //     return {
  //       result: false,
  //       msg: "Password must contain one number, one alphabet and one special character(!@#$%^&*)",
  //     };
  //   }
  //   return {
  //     result: true,
  //     msg: "",
  //   };
  // };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" && !validateEmail(email)) {
      setError("Invalid email");
    } else if (password.length < 8) {
      setError("Password must be at least 8 chars long");
    } else if (!error) {
      console.log(email, password);
      const token = await login({
        email,
        password,
      });
      // saveToken(token);
      localStorage.setItem("token", JSON.stringify(token));

      navigate("/dashboard");
      window.location.reload();
    }
  };

  // useEffect(() => {
  //   navigate("/dashboard");
  // }, [navigate]);

  return (
    <Grid container height="100vh" className="mainlogin">
      <Grid
        item
        alignItems="center"
        marginLeft="auto"
        marginTop="auto"
        marginBottom="auto"
        marginRight="auto"
      >
        <p className="f2 w2" style={{ color: "blue" }}>
          Please log in!!
        </p>
        {error && (
          <div style={{ color: "red", autoHideDuration: 3000 }}>{error}</div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Input.Password
              size="large"
              type="Password"
              className="bg6"
              style={{ borderRadius: "5px" }}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? (
                  <Eye
                    size={16}
                    // color={theme === "dark-theme" ? "#61a6ff" : " #1c7df8"}
                  />
                ) : (
                  <EyeSlash
                    size={16}
                    // color={theme === "dark-theme" ? "#61a6ff" : " #1c7df8"}
                  />
                )
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
