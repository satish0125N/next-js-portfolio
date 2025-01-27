import React from 'react';
import { Calendar, Users, ArrowRight, Link as LinkIcon, } from 'lucide-react';
import { Project } from '../types';
import { Link } from 'react-router-dom';
import teamData from '../../backend/team.json';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

  
  const getStatusColor = (status: string) => {
    const colors = {
      'Not Started': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors['Not Started'];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'bg-gray-100 text-gray-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || colors['Low'];
  };

  const getTeamMemberName = (teamId: string) => {
    const teamMember = teamData.find(member => member.id === teamId);
    return teamMember ? teamMember.name : teamId;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
        <div className="flex gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>
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
      
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.teamMembers.slice(0, 3).map((memberId, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
              title={getTeamMemberName(memberId)}
            >
              <span className="text-xs font-medium">{getTeamMemberName(memberId).charAt(0)}</span>
            </div>
          ))}
          {project.teamMembers.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
              <span className="text-xs font-medium">+{project.teamMembers.length - 3}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
       
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
            >
              <LinkIcon className="w-4 h-4" />
              Visit Project
            </a>
          )}
         <Link 
              to={`/projects/${project.id}`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Details
              <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;