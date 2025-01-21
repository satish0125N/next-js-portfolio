import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Calendar, Users, ArrowRight } from 'lucide-react';

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
    teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']
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
    teamMembers: ['Alex Brown', 'Emily Davis']
  }
];

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : MOCK_PROJECTS;
  });

  return (
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

            <Link 
              to={`/projects/${project.id}`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
