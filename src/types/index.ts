export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  projectUrl?: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'On Hold' | 'Completed';
  teamMembers: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}