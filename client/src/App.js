import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Login from "./views/Login/Login";
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
