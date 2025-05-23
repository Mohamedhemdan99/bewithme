
import React from "react";
import { Clock } from "lucide-react";

interface VideoCallHeaderProps {
  callTitle: string;
  participantCount: number;
  duration: string;
}

export const VideoCallHeader: React.FC<VideoCallHeaderProps> = ({
  callTitle,
  participantCount,
  duration,
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 py-3 px-6 flex items-center animate-slide-down shadow-md">
      <div className="flex items-center">
        <h1 className="text-[#93C5FD] text-lg font-medium">{callTitle}</h1>
        <div className="h-6 border-l border-gray-700 mx-4"></div>
        <div className="bg-gray-800 rounded-full px-3 py-1 text-[#93C5FD] text-sm">
          {participantCount} {participantCount === 1 ? "participant" : "participants"}
        </div>
      </div>
      
      <div className="ml-auto flex items-center">
        <div className="bg-gray-800 rounded-full px-3 py-1 flex items-center gap-1 text-[#93C5FD] text-sm">
          <Clock size={14} strokeWidth={2.5} className="text-[#93C5FD]" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};
