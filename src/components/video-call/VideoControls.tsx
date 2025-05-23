
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, Phone, Share, Users, MessageSquare, MoreVertical, Pin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VideoControlsProps {
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isPinned: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onTogglePin: () => void;
  onLeaveCall: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isMuted,
  isVideoOn,
  isScreenSharing,
  isPinned,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onTogglePin,
  onLeaveCall,
}) => {
  return (
    <div className="bg-gray-900 border-t border-gray-800 py-4 px-6 flex items-center justify-center animate-slide-up shadow-sm" style={{ animationDelay: "0.3s", opacity: 0 }}>
      <div className="flex items-center justify-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isMuted ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-800 text-[#93C5FD] hover:bg-gray-700"}`}
                onClick={onToggleMute}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Unmute" : "Mute"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isVideoOn ? "bg-gray-800 text-[#93C5FD] hover:bg-gray-700" : "bg-red-500 text-white hover:bg-red-600"}`}
                onClick={onToggleVideo}
              >
                {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isScreenSharing ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]" : "bg-gray-800 text-[#93C5FD] hover:bg-gray-700"}`}
                onClick={onToggleScreenShare}
              >
                <Share size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isScreenSharing ? "Stop screen sharing" : "Share screen"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full p-3 ${isPinned ? "bg-[#3B82F6] text-white hover:bg-[#2563EB]" : "bg-gray-800 text-[#93C5FD] hover:bg-gray-700"}`}
                onClick={onTogglePin}
              >
                <Pin size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPinned ? "Unpin" : "Pin your video"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-gray-800 text-[#93C5FD] hover:bg-gray-700"
              >
                <Users size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Participants 'Soon'</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-gray-800 text-[#93C5FD] hover:bg-gray-700"
              >
                <MessageSquare size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat 'Soon'</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-gray-800 text-[#93C5FD] hover:bg-gray-700"
              >
                <MoreVertical size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options 'Soon'</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="h-10 border-l border-gray-700 mx-2"></div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-3 bg-red-500 text-white hover:bg-red-600"
                onClick={onLeaveCall}
              >
                <Phone size={24} className="rotate-[135deg]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Leave call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
