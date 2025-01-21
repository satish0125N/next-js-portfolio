
import React, { useState, useEffect } from 'react';

import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import EditProjectModal from '../components/EditProjectModal';
import { Project } from '../types';
import { PlusCircle } from 'lucide-react';


const MOCK_PROJECTS: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform Redesign',
      description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX',
      summary: 'Modernizing the online shopping experience with a focus on mobile-first design and improved user engagement',
      projectUrl: 'https://github.com/example/ecommerce',
      technologies: ['React', 'Node.js', 'MongoDB'],
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-06-30'),
      priority: 'High',
      status: 'In Progress',
      teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
      
    },
    {
      id: '2',
      title: 'Customer Support Dashboard',
      description: 'Real-time dashboard for customer support metrics and ticket management',
      summary: 'Building a comprehensive dashboard to monitor and manage customer support operations efficiently',
      technologies: ['React', 'GraphQL', 'PostgreSQL'],
      startDate: new Date('2024-02-15'),
      priority: 'Medium',
      status: 'Not Started',
      teamMembers: ['Alex Brown', 'Emily Davis'],
      projectUrl: 'https://github.com/example/ecommerce',
    },
    {
      id: '3',
      title: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android platforms',
      summary: 'Developing a cross-platform mobile app to extend our service reach to mobile users',
      technologies: ['React Native', 'Firebase'],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-04-30'),
      priority: 'High',
      status: 'On Hold',
      teamMembers: ['Chris Wilson', 'David Lee', 'Lisa Anderson'],
      projectUrl: 'https://github.com/example/ecommerce',
    }
  ];


const Header = () => {
    const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : MOCK_PROJECTS;
  });
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleCreateProject = (newProject: Omit<Project, 'id'>) => {
    const projectWithId = {
      ...newProject,
      id: (projects.length + 1).toString()
    };
    setProjects([...projects, projectWithId]);
  };

  const handleEditProject = (updatedProject: Project) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
  };
     const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setIsEditProjectModalOpen(true);
  };

  return (
    <>
    <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects Overview</h1>
              <p className="text-gray-500">Track and manage your ongoing projects</p>
            </div>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              New Project
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onEditClick={() => handleEditClick(project)}
                onDeleteClick={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>
            <NewProjectModal
            isOpen={isNewProjectModalOpen}
            onClose={() => setIsNewProjectModalOpen(false)}
            onSubmit={handleCreateProject}
            />
            {selectedProject && (
                <EditProjectModal
                isOpen={isEditProjectModalOpen}
                onClose={() => {
                    setIsEditProjectModalOpen(false);
                    setSelectedProject(null);
                    }}
                    onSubmit={handleEditProject}
                    project={selectedProject}
                    />
                )}
        </main>
        </>
     );};

export default Header;