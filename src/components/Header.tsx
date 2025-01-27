import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  // State to store the fetched data
  const [user, setUser] = useState<any[]>([]);

  // Fetching the JSON data when the component mounts
  useEffect(() => {
    fetch('/user.json') // Fetch the JSON file from the public folder
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setUser(data); // Set the data in state
        console.log(data); // Log the data to the console
      })
      .catch((error) => console.error('Error fetching data:', error)); // Log any errors
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        {/* Search bar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* User Profile and Logout */}
        <div className="flex items-center gap-4">
          {user.map((u, index) => (
            <div key={index} className="flex items-center gap-2">
              <img 
                className="hidden md:block object-cover object-center rounded w-[25px] h-[25px]" 
                alt="profile" 
                src={u.img} 
              />
              <span className="text-sm font-medium text-gray-700">{u.name}</span>
            </div>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
