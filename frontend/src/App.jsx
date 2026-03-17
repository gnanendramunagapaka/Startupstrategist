import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IdeaDetails from './pages/IdeaDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans bg-[#06060f] min-h-screen text-[#ede9ff] relative">
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_65%_45%_at_15%_10%,rgba(100,70,240,0.1)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_85%_85%,rgba(56,189,248,0.07)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/idea/:id" element={<IdeaDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
