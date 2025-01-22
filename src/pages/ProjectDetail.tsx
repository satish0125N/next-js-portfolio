import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../types';
import { ArrowLeft, Calendar,  Link as LinkIcon } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`https://next-js-portfolio-ebon-three.vercel.app/backend/projects.php?id=${id}`, {
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
        // Since the API returns an array with one item when querying by ID
        setProject(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching project details');
        console.error('Error fetching project details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="animate-pulse">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 p-6">
        <div className="text-gray-500">Project not found</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium 
              ${project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'}`}
            >
              {project.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium 
              ${project.priority === 'High' ? 'bg-red-100 text-red-800' :
                project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'}`}
            >
              {project.priority}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Start Date: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              {project.endDate && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>End Date: {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
              )}
              {project.projectUrl && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-gray-600" />
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Project URL
                  </a>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
            <div className="flex flex-wrap gap-2">
              {project.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {member}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
