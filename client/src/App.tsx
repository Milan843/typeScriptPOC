import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <BrowserRouter forceRefresh={false}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
