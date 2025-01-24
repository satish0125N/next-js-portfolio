// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Projects from './pages/Projects';
// import Team from './pages/Team';
// import ProjectDetail from './pages/ProjectDetail';

// function App() {
//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/projects" element={<Projects />} />
//             <Route path="/projects/:id" element={<ProjectDetail />} />
//             <Route path="/team" element={<Team />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'; // Home component for /home/* routes
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
