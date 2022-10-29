import "./App.css";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Appcontext from "./components/Appcontext";
import { useState } from "react";

function App() {
  const [selbus, setselbus] = useState([
    JSON.stringify("Bus No : 1 Tiruvotriyur"),
  ]);
  return (
    <div>
      <Appcontext.Provider value={{ selbus, setselbus }}>
        <Sidebar />
        <Homepage />
      </Appcontext.Provider>
    </div>
  );
}

export default App;
