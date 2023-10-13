import "./App.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";

function App() {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
