import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin"
import ImageUploader from "./views/ImageUploader/ImageUploader";
import CreateWork from "./views/Admin/createWork/CreateWork";
import EditWork from "./views/Admin/editWork/EditWork";
import WorkView from "./views/WorkView/WorkView";
import NotFound from "./views/NotFound";


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/createWork" component={CreateWork} />
        <Route exact path="/editWork" component={EditWork} />
        <Route exact path="/viewWork/:id" component={WorkView} />
        <Route exact path="/img" component={ImageUploader} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
