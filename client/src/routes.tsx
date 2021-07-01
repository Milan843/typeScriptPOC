import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/view/:userId" component={UserDashboard} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  );
};

export default Routes;
