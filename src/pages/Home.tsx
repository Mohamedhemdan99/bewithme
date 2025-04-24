
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Bell, User } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for posts
interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  isAccepted?: boolean;
  acceptCount?: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    authorName: 'Sara Johnson',
    authorUsername: 'saraj',
    authorAvatar: '/lovable-uploads/19820934-c2d1-4a88-babe-dae50caea634.png',
    content: 'Just finished a great session helping someone with their math homework. It feels great to make a difference!',
    timestamp: '2h ago',
    acceptCount: 15
  },
  {
    id: '2',
    authorName: 'Salma Ahmed',
    authorUsername: 'salmaa',
    authorAvatar: '/lovable-uploads/171d612a-355f-435f-8dca-624701830287.png',
    content: 'Looking for someone to help me with my Spanish practice. Anyone available for a quick chat session?',
    timestamp: '5h ago',
    acceptCount: 3
  },
  {
    id: '3',
    authorName: 'Ahmed Hassan',
    authorUsername: 'ahmedh',
    authorAvatar: '/lovable-uploads/01744b49-bc3d-47a4-b4ff-49ee164b9ba7.png',
    content: "I've been using this platform for a month now and I've made so much progress with my studies. Highly recommend connecting with mentors here!",
    timestamp: '1d ago',
    acceptCount: 27
  }
];

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleAcceptPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { 
        ...post, 
        isAccepted: true,
        acceptCount: (post.acceptCount || 0) + 1
      } : post
    ));
    toast.success('Post accepted');
  };

  const handleIgnorePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.info('Post ignored');
  };

  return (
    <div className="app-container bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className={`p-6 shadow-sm ${post.authorUsername === 'salmaa' ? 'border-blue-500 border-2' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.authorName}</h3>
                    <p className="text-sm text-gray-500">@{post.authorUsername} · {post.timestamp}</p>
                  </div>
                </div>
                {post.authorUsername !== user?.username && (
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-500">
                    <Bell className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-gray-800">{post.content}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="font-medium text-blue-500">{post.acceptCount || 0}</span>
                  <span className="ml-1">Acceptances</span>
                </div>
                
                {post.authorUsername !== user?.username && !post.isAccepted && (
                  <div className="flex gap-4">
                    <Button 
                      className="btn-primary"
                      onClick={() => handleAcceptPost(post.id)}
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline"
                      className="btn-outline"
                      onClick={() => handleIgnorePost(post.id)}
                    >
                      Ignore
                    </Button>
                  </div>
                )}
                
                {post.isAccepted && (
                  <div>
                    <span className="text-green-600 font-medium">Accepted</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
