import "./App.scss";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";


function App() {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
