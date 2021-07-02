import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getUserById } from "./redux/actions/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserById());
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter forceRefresh={false}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
