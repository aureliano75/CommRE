import logo from "./logo.svg";
import "./App.css";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Dashboard test={"test text"} />
    </div>
  );
}

export default App;
