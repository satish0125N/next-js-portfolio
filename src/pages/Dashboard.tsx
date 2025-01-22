import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Calendar, Users } from 'lucide-react';



const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        
        const response = await fetch('https://next-js-portfolio-ebon-three.vercel.app/backend/projects.php', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer backend_static_token',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
       
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  return (
    <div className=" ">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome to your project dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    <Link to={`/projects/${project.id}`} className="hover:text-blue-600">
                      {project.title}
                    </Link>
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.summary}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.teamMembers.length} members</span>
                  </div>
                </div>

                
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
