import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TokenFactory from "./pages/TokenFactory";
import Lock from "./pages/Lock";
import Airdrop from "./pages/Airdrop";
import LockDetails from "./pages/LockDetails";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token-factory" element={<TokenFactory />} />
        <Route path="/lock" element={<Lock />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/lock/:address" element={<LockDetails />} />
      </Routes>
    </div>
  );
}

export default App;
