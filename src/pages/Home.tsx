import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; // Import Dashboard component
import Projects from './Projects';   // Import Projects component
import Team from './Team';           // Import Team component

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass the handleLogout function to the Header */}
        <Header handleLogout={handleLogout} />
        <div className="p-6">
          {/* Nested Routes */}
          <h1 className='text-4xl font-bold' >Welcome ProjectHub By Zs</h1>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="team" element={<Team />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
