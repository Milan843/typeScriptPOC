import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import Modal from "./components/Modal";

const Routes = () => {
  return (
    <div>
      <Modal />
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute
          exact
          path="/update/:userId"
          component={UserDashboard}
        />
        <ProtectedRoute exact path="/view/:userId" component={UserDashboard} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </div>
  );
};

export default Routes;
