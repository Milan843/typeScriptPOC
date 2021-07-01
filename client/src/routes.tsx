import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import LogIn from "./components/LogIn";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/register" component={Register} />
      {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/view/:userId" component={Dashboard} />
            <Route path="*" component={NotFound} /> */}
    </Switch>
  );
};

export default Routes;
