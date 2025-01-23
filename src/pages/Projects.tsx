import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetching the JSON data when the component mounts
  useEffect(() => {
    fetch('/projects.json') // Ensure this path is correct
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data); // Set the data in state
        console.log(data); // Log the data to the console
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any errors
        setError(error.message); // Set error state
      });
  }, []);

  return (
    <>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Our Projects</h1>
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
          {projects.map((project, index) => (
            
            <ProjectCard 
              key={index} 
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
