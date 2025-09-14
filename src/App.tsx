import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TokenFactory from "./pages/TokenFactory";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token-factory" element={<TokenFactory />} />
      </Routes>
    </div>
  );
}

export default App;
