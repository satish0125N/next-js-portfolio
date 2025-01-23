
import { Award, Code, Globe, Star } from 'lucide-react';
import { useEffect, useState } from 'react';


const Team = () => {
  // State to store the fetched data
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetching the JSON data when the component mounts
  useEffect(() => {
    fetch('/team.json') // Fetch the JSON file from the public folder
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setTeamMembers(data); // Set the data in state
        console.log(data); // Log the data to the console
      })
      .catch((error) => console.error('Error fetching data:', error)); // Log any errors
  }, []);

  // Render the project data in JSX
  return (
    <main className="flex-1 overflow-y-auto p-6">
       <div className="mb-6">
         <h1 className="text-2xl font-bold text-gray-900">Our Team</h1>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {teamMembers.map((member, index) => (
           <div
             key={index}
             className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
           >
             <div className="space-y-4">
               {/* Header with Name and Role */}
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="font-semibold text-xl text-gray-900">{member.name}</h3>
                   <p className="text-blue-600 font-medium">{member.role}</p>
                 </div>
                 <div className="flex items-center gap-1">
                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
                   <span className="font-semibold">{member.rating}</span>
                 </div>
               </div>

               {/* Rank */}
               <div className="flex items-center gap-2">
                 <Award className="w-5 h-5 text-purple-500" />
                 <span className="text-gray-700">{member.rank}</span>
               </div>

               {/* Skills */}
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Code className="w-5 h-5 text-gray-500" />
                   <span className="font-medium text-gray-700">Skills</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {member.skills.map((skill, skillIndex) => (
                     <span
                       key={skillIndex}
                       className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                     >
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>

               {/* Languages */}
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Globe className="w-5 h-5 text-gray-500" />
                   <span className="font-medium text-gray-700">Languages</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {member.languages.map((language, langIndex) => (
                     <span
                       key={langIndex}
                       className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
                     >
                       {language}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </main>
  );
};

export default Team;
