import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const apiUrl = window.location.hostname === 'localhost'
            ? 'http://localhost/react-with-tappa/next-js-portfolio/backend/projects.php'
            : 'https://next-js-portfolio-ebon-three.vercel.app/backend/projects.json';

          const response = await fetch(apiUrl, {
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
        console.log(data);
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
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
            <p className="text-gray-500">Track and manage your ongoing projects</p>
          </div>
          
        </div>
        
        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
             
            />
          ))}
        </div>
      )}
      </main>

     

      
    </>
  );
};

export default Projects;
