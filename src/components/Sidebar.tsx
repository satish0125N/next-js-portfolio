
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 

} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  // Sidebar.tsx
const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/home/dashboard' }, // Update to /home/dashboard
  { icon: FolderKanban, label: 'Projects', href: '/home/projects' }, // Update to /home/projects
  { icon: Users, label: 'Team', href: '/home/team' }, // Update to /home/team
];

  

  return (
    <div className="w-[4rem] md:w-64 bg-gray-900 min-h-screen p-4 text-white">
      <div className="flex items-center gap-2 mb-8 px-2">
        <FolderKanban className="w-8 h-8 text-blue-400 hidden md:block" />
        <h1 className="hidden md:block text-xl font-bold">ProjectHub By Zs</h1>
        <span className='block md:hidden' >Zs</span>
        

      </div>
      <nav>
      
        {menuItems.map((item) => (
          
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors mb-1 ${
              location.pathname === item.href
                ? 'bg-gray-800 text-white'
                : 'hover:bg-gray-800 text-gray-300 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className='hidden md:block' >{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;