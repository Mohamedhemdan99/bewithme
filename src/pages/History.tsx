
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

// Mock data for history
interface HistoryItem {
  id: string;
  type: 'connection' | 'help-offered' | 'help-received';
  personName: string;
  personUsername: string;
  personAvatar: string;
  timestamp: string;
  status?: 'completed' | 'pending' | 'cancelled';
  description: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    type: 'connection',
    personName: 'Salma',
    personUsername: 'salma',
    personAvatar: '/lovable-uploads/171d612a-355f-435f-8dca-624701830287.png',
    timestamp: '2 days ago',
    status: 'completed',
    description: 'You connected with Salma'
  },
  {
    id: '2',
    type: 'help-offered',
    personName: 'Ahmed',
    personUsername: 'ahmed',
    personAvatar: '/lovable-uploads/01744b49-bc3d-47a4-b4ff-49ee164b9ba7.png',
    timestamp: '1 week ago',
    status: 'completed',
    description: 'You helped Ahmed with math homework'
  },
  {
    id: '3',
    type: 'help-received',
    personName: 'Nour',
    personUsername: 'nour',
    personAvatar: '/lovable-uploads/19820934-c2d1-4a88-babe-dae50caea634.png',
    timestamp: '2 weeks ago',
    status: 'completed',
    description: 'Nour helped you with English practice'
  },
  {
    id: '4',
    type: 'connection',
    personName: 'Mohsen',
    personUsername: 'mohsen',
    personAvatar: '/lovable-uploads/7803421c-dd1e-46c1-becb-34cd65708201.png',
    timestamp: '3 weeks ago',
    status: 'completed',
    description: 'You connected with Mohsen'
  },
  {
    id: '5',
    type: 'help-offered',
    personName: 'Nada',
    personUsername: 'nada',
    personAvatar: '/lovable-uploads/8f75add4-3c0b-4bbd-8ee7-b1647ebdfb6d.png',
    timestamp: '1 month ago',
    status: 'cancelled',
    description: 'Session cancelled: Schedule conflict'
  }
];

const History = () => {
  return (
    <div className="app-container min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Activity History</h1>
        
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-4 border-l-4 border-l-brand-blue">
              <div className="flex items-start">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={item.personAvatar} alt={item.personName} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.description}</h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">@{item.personUsername}</span> · {item.timestamp}
                      </p>
                    </div>
                    
                    <div 
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                  
                  {item.type !== 'connection' && (
                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" size="sm" className="text-sm">
                        View Details
                      </Button>
                      
                      <Button variant="outline" size="sm" className="text-sm text-brand-blue border-brand-blue">
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="text-gray-500">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
