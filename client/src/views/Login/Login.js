import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import {authenticate} from "../../api/authAPI"
import {
  Grid,
  Segment,
  Header,
  Button,
  Divider,
  Form,
  Input,
  Image
} from "semantic-ui-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);




  const login = async event => {
    if (!username || !password) {
      setError("Missing username or password");
      return;
    }
    let authResponse = await authenticate(username, password);
    if (authResponse.token) {
      setSuccessfulLogin(true);
    } else {
        console.log("here then")
        console.log(password)
      setError("Invalid username/password");
    }
  };

  if (successfulLogin) {
    return <Redirect to={{pathname: "/admin",
            state: {isAdmin: true}              
          }}/>;
    
  }


  

  return (
    <Grid stackable className="container">
      <Grid.Column width={4} />
      <Grid.Column width={8}>
        <Segment padded="very" stacked>
          <Header
            centered
            textAlign="center"
            as="div"
            icon
            style={{ backgroundColor: "white" }}
          >
            
          </Header>
          <Divider hidden />
          <Segment raised color="orange">
            <Form widths='equal'>
              <Form.Field
                label="Username"
                control={Input}
                onChange={event => setUsername(event.target.value)}
              />
              <Form.Input
                label="Password"
                control={Input}
                type="password"
                onChange={event => setPassword(event.target.value)}
              />
              <Button floated='left' style={{width:"48%"}} className="loginButton" fluid onClick={login}>
                Login
              </Button>
              <div style={{padding: '3vh'}} />
            </Form>
          </Segment>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Login;