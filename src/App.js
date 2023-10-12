import "./App.scss";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import { useSelector } from 'react-redux';

function App() {
  const count = useSelector((state) => state.count);
  return (
    <div>
      <h1>Redux Learn</h1>
      <p>Count:{count}</p>

      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
