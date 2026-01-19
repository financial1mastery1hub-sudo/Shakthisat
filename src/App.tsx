import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Partners from './pages/Partners';
import About from './pages/About';
import Advisors from './pages/Advisors';
import Countries from './pages/Countries';
import Devices from './pages/Devices';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/advisors" element={<Advisors />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/devices" element={<Devices />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;