import logo from "./logo.svg";
import "./App.css";
import Posts from "./Posts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>My Blog App</h1>
        <p>Welcome to our blog application!</p>
      </header>
      <main>
        <Posts />
      </main>
    </div>
  );
}

export default App;
