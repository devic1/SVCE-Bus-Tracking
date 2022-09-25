import "./App.css";
import Homepage from "./components/Homepage";
import Navigator from "./components/navigator";

function App() {
  return (
    <div>
      <Navigator istrack={true} />
      <Homepage />
    </div>
  );
}

export default App;
