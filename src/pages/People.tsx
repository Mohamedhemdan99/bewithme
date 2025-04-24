
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

// Mock data for people
interface Person {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Adham',
    username: 'adham',
    avatar: '/lovable-uploads/01744b49-bc3d-47a4-b4ff-49ee164b9ba7.png',
    status: 'online'
  },
  {
    id: '2',
    name: 'Salma',
    username: 'salma',
    avatar: '/lovable-uploads/171d612a-355f-435f-8dca-624701830287.png',
    status: 'offline'
  },
  {
    id: '3',
    name: 'Nour',
    username: 'nour',
    avatar: '/lovable-uploads/19820934-c2d1-4a88-babe-dae50caea634.png',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Nada',
    username: 'nada',
    avatar: '/lovable-uploads/8f75add4-3c0b-4bbd-8ee7-b1647ebdfb6d.png',
    status: 'away'
  },
  {
    id: '5',
    name: 'Salem',
    username: 'salem',
    avatar: '/lovable-uploads/80906287-ea24-4948-9b97-8e41512af654.png',
    status: 'offline'
  },
  {
    id: '6',
    name: 'Mohsen',
    username: 'mohsen',
    avatar: '/lovable-uploads/7803421c-dd1e-46c1-becb-34cd65708201.png',
    status: 'online'
  }
];

const People = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [people] = useState<Person[]>(mockPeople);
  
  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    person.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">People</h1>
          <div className="relative max-w-xl">
            <Input
              type="text"
              placeholder="Search for people..."
              className="pl-10 pr-4 py-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="20" 
              height="20" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <Card key={person.id} className="p-6 flex flex-col items-center hover:shadow-md transition-shadow">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-semibold text-center mb-2">{person.name}</h3>
              
              <div 
                className={`px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  person.status === 'online' ? 'bg-green-100 text-green-800' :
                  person.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                <span 
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    person.status === 'online' ? 'bg-green-500' :
                    person.status === 'away' ? 'bg-yellow-500' :
                    'bg-gray-500'
                  }`}
                ></span>
                {person.status === 'online' ? 'Active' : 
                 person.status === 'away' ? 'Away' : 'Offline'}
              </div>
              
              <div className="mt-auto w-full">
                <Button className="w-full btn-primary">Connect</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
