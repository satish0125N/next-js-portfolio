import React from 'react';

const MOCK_TEAM_MEMBERS = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Project Manager',
    email: 'john.doe@example.com',
    avatar: '🧑‍💼'
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Senior Developer',
    email: 'jane.smith@example.com',
    avatar: '👩‍💻'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'UI/UX Designer',
    email: 'mike.johnson@example.com',
    avatar: '👨‍🎨'
  }
];

const Team = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <p className="text-gray-500">Meet our talented team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{member.avatar}</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {member.email}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Team;
