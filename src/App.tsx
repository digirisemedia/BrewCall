import { HashRouter, Routes, Route } from 'react-router-dom';
import { RequestProvider } from './context/RequestContext';
import LandingPage from './pages/LandingPage';
import CustomerView from './pages/CustomerView';
import StaffDashboard from './pages/StaffDashboard';

function App() {
  return (
    <RequestProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/table/:tableId" element={<CustomerView />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
        </Routes>
      </HashRouter>
    </RequestProvider>
  );
}

export default App;
