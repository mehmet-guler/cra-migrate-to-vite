import logo from "./logo.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  console.log("PROCESS",import.meta.env)
  return (
    <div className="App" style={{height:"250px",backgroundColor:"red",margin:"150px"}}>
      <h1>{import.meta.env.REACT_APP_NAME}</h1>
      <Card/>
    </div>
  );
}

export default App;
