import React, { useState, useEffect, useRef } from "react";
import { VideoContainer } from "../components/video-call/VideoContainer";
import { VideoControls } from "../components/video-call/VideoControls";
import { VideoParticipantList } from "../components/video-call/VideoParticipantList";
import { VideoCallHeader } from "../components/video-call/VideoCallHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AgoraRTC, { IAgoraRTCClient, ILocalTrack, IRemoteTrack } from "agora-rtc-sdk-ng";
import { useSignalR } from "@/hooks/useSignalR";
import api from "@/services/axiosService";
// import { formatDuration, getMockParticipants } from "../services/agoraConfig";

export const VideoCallScreen: React.FC = () => {
  // Local state variables
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [joinAnimation, setJoinAnimation] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>("1"); // Mock active speaker
  const [pinnedParticipantId, setPinnedParticipantId] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const clientRef = useRef(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalTrack | null>(null);
  const [audioLevels, setAudioLevels] = useState<{ [key: string]: number }>({});
  const [isCallConnected, setIsCallConnected] = useState(false);
  const { AppId, ChannelName,PatientImage,PatientName } = useSignalR();
  






  // join new user to the call
  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;
    AgoraRTC.setLogLevel(4);
    const joinChannel = async () => {
      try {
        console.log("Joining channel with AppId:", AppId, "ChannelName:", ChannelName);
        const Uid = await client.join(AppId, ChannelName, null, null);
        console.log("Joined channel with UID:", Uid);

        // Create and publish local tracks
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
       
        microphoneTrack.setEnabled(false);
        cameraTrack.setEnabled(false);

        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);
        
        await client.publish([microphoneTrack, cameraTrack]);
        console.log("Published local tracks");

        // Initialize local participant
        setParticipants([
          {
            id: Uid,
            name: localStorage.getItem("fullName"),
            isSelf: true,
            isMuted: isMuted,
            isVideoOn: isVideoOn,
            videoTrack: cameraTrack,
            audioTrack: microphoneTrack,
            imageURL: localStorage.getItem("imageURL"),
          },
        ]);

        // Enable active speaker detection
        client.enableAudioVolumeIndicator();
        
        // Listen for active speaker with improved handler
client.on("volume-indicator", (volumes) => {
  if (volumes.length === 0) return;
  
  // Find the loudest participant above threshold
  const threshold = 5; // Minimum audio level to be considered "speaking"
  const sortedVolumes = [...volumes].sort((a, b) => b.level - a.level);
  
  // Only update active speaker if someone is actually talking
  if (sortedVolumes[0] && sortedVolumes[0].level > threshold) {
    // Convert to string for consistent comparisons
    const loudestUid = String(sortedVolumes[0].uid);
    console.log("Active speaker detected:", loudestUid, "level:", sortedVolumes[0].level);
    setActiveSpeaker(loudestUid);
  } else if (sortedVolumes.every(v => v.level <= threshold)) {
    // No one is speaking loud enough
    setActiveSpeaker(null);
  }
  
  // Store audio levels for all participants
  const levels: { [key: string]: number } = {};
  volumes.forEach((volume) => {
    levels[String(volume.uid)] = Math.min(100, Math.round(volume.level * 1.2));
  });
  setAudioLevels(levels);
});

        // Handle remote user joining - FIXED THIS PART
        client.on("user-joined", (user) => {
          console.log("User joined:", user.uid);

          // Add user to participants even before they publish media
          setParticipants((prev) => {
            // Check if the user already exists in the participant list
            if (!prev.find(p => p.id === user.uid)) {
              return [
                ...prev,
                {
                  id: user.uid,
                  name: PatientName || "",
                  isSelf: false,
                  isMuted: true,
                  isVideoOn: false,
                  videoTrack: null,
                  audioTrack: null,
                  imageURL: PatientImage || "",
                }
              ];
            }
            return prev;
          });
        });

        // Handle remote user publishing media
        client.on("user-published", async (user, mediaType) => {          
          await client.subscribe(user, mediaType);
          console.log("Subscribed to", mediaType, "track from user", user.uid);

          if (mediaType === "audio" && user.audioTrack) {
            // Play audio immediately after subscribing
            user.audioTrack.play();
          }
          
          setParticipants((prev) => {
            const existing = prev.find((p) => p.id === user.uid);
            
            if (existing) {
              // Update existing participant with new track information
              return prev.map((p) => {
                if (p.id === user.uid) {
                  const updates = {
                    ...p,
                    name: p.name || localStorage.getItem("fullName"),
                  };
                  
                  if (mediaType === "video") {
                    updates.videoTrack = user.videoTrack;
                    updates.isVideoOn = true;
                  }
                  
                  if (mediaType === "audio") {
                    updates.audioTrack = user.audioTrack;
                    updates.isMuted = false;
                    // Play the audio
                    user.audioTrack?.play();
                  }
                  
                  return updates;
                }
                return p;
              });
            } else {
              // Create new participant if they don't exist yet
              const newParticipant = {
                id: user.uid,
                name: localStorage.getItem("fullName"),
                isSelf: false,
                isMuted: mediaType !== "audio",
                isVideoOn: mediaType === "video",
                videoTrack: mediaType === "video" ? user.videoTrack : null,
                audioTrack: mediaType === "audio" ? user.audioTrack : null,
                imageURL: PatientImage,
              };
              
              // Play audio if available
              if (mediaType === "audio") {
                user.audioTrack?.play();
              }
              
              return [...prev, newParticipant];
            }
          });
        });

        // Handle remote user unpublishing media
        client.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "video") {
            setParticipants((prev) =>
              prev.map((p) =>
                p.id === user.uid ? { ...p, videoTrack: null, isVideoOn: false } : p
              )
            );
          }

          if (mediaType === "audio") {
            setParticipants((prev) =>
              prev.map((p) =>
                p.id === user.uid ? { ...p, audioTrack: null, isMuted: true } : p
              )
            );
          }
        });

        // Handle remote user leaving the call
        client.on("user-left", (user) => {
          console.log("User left:", user.uid);
          setParticipants((prev) => prev.filter((p) => p.id !== user.uid));
          // Reset active speaker if the leaving user was the active speaker
          setActiveSpeaker(prev => prev === String(user.uid) ? null : prev);
        });

        toast.success("Connected to call");
        setIsCallConnected(true);
      } catch (error) {
        console.error("Failed to join channel", error);
        toast.error("Failed to connect to call");
      }
    };

    joinChannel();
    setJoinAnimation(true);

    return () => {
      if (clientRef.current) {
        clientRef.current.off("active-speaker");
        clientRef.current.off("volume-indicator");
        clientRef.current.removeAllListeners();
        clientRef.current.leave().then(() => {
          console.log("Client left channel");
        }).catch(err => {
          console.error("Error leaving channel:", err);
        });
      }
      
      // Clean up local tracks
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }
      
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
      }
    };
      
  }, [AppId, ChannelName]);










  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

 

  // Local control handlers
  const toggleMute = () => {
    if (localAudioTrack) {
      if (localAudioTrack.enabled) {
        localAudioTrack.setEnabled(false);
      } else {
        localAudioTrack.setEnabled(true);
      }
    }
    setIsMuted(!isMuted);
    
    // Update local participant
    setParticipants(prev => 
      prev.map(p => 
        p.isSelf ? { ...p, isMuted: !isMuted } : p
      )
    );
    
    toast(isMuted ? "Microphone turned on" : "Microphone muted");
  };
  
  const toggleVideo = () => {
    if (localVideoTrack) {
      if (localVideoTrack.enabled) {
        localVideoTrack.setEnabled(false);
      } else {
        localVideoTrack.setEnabled(true);
      }
    }
    setIsVideoOn(!isVideoOn);
    
    // Update local participant
    setParticipants(prev => 
      prev.map(p => 
        p.isSelf ? { ...p, isVideoOn: !isVideoOn } : p
      )
    );
    
    toast(isVideoOn ? "Camera turned off" : "Camera turned on");
  };
  
  //done  work code under it
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: {
            width: 1920,
            height: 1080,
            frameRate: 30,
            bitrateMax: 1000,
          },
        }, 'disable');
        
        if (localVideoTrack) {
          await clientRef.current?.unpublish(localVideoTrack);
        }
        
        await clientRef.current?.publish(screenTrack);
        setLocalVideoTrack(screenTrack);
        setIsScreenSharing(true);
        toast("Screen sharing started");
      } catch (error) {
        console.error("Failed to start screen sharing", error);
        toast.error("Failed to start screen sharing");
      }
    } else {
      try {
        const cameraTrack = await AgoraRTC.createCameraVideoTrack();
        
        if (localVideoTrack) {
          await clientRef.current?.unpublish(localVideoTrack);
        }
        
        await clientRef.current?.publish(cameraTrack);
        setLocalVideoTrack(cameraTrack);
        setIsScreenSharing(false);
        toast("Screen sharing stopped");
      } catch (error) {
        console.error("Failed to stop screen sharing", error);
        toast.error("Failed to stop screen sharing");
      }
    }
  };
    // setIsScreenSharing(!isScreenSharing);
    // toast(isScreenSharing ? "Screen sharing stopped" : "Screen sharing started");

  
  //done
  const togglePin = () => {
    // Find self ID
    const selfId = participants.find(p => p.isSelf)?.id;
    if (pinnedParticipantId === selfId) {
      setPinnedParticipantId(null);
      toast("Your video unpinned");
    } else {
      setPinnedParticipantId(selfId || null);
      toast("Your video pinned");
    }
  };
  
  //done
  const togglePinForParticipant = (participantId: string) => {
    if (pinnedParticipantId === participantId) {
      setPinnedParticipantId(null);
      toast("Video unpinned");
    } else {
      setPinnedParticipantId(participantId);
      const participant = participants.find(p => p.id === participantId);
      toast(`${participant?.name}'s video pinned`);
    }
  };
  
  //done
  const leaveCall = async () => {
    if (!clientRef.current){
      window.location.href = "/home";
      return;
    }
    if (!ChannelName) {
      window.location.href = "/home";
      return;
    }
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    
    try {
      await api.post(`/api/calls/${ChannelName}/end`);
    } catch (error) {
      console.error("Error ending call", error);
    }
    
    if (clientRef.current) {
      clientRef.current.leave();
    }
    setLocalAudioTrack(null);
    setLocalVideoTrack(null);
    setIsCallConnected(false);
    
    window.location.href = "/home";
  };
  
  // Find self ID
  const selfId = participants.find(p => p.isSelf)?.id;
  const isSelfPinned = selfId === pinnedParticipantId;
  
  return (
    <div className={`flex flex-col h-screen bg-gray-950 text-[#93C5FD] transition-opacity duration-500 ${joinAnimation ? 'opacity-100' : 'opacity-0'}`}>
      <VideoCallHeader 
        callTitle="Team Weekly Sync"
        participantCount={participants.length}
        duration={formatDuration(callDuration)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main video container */}
        <VideoContainer 
          participants={participants} 
          activeSpeakerId={activeSpeaker}
          isScreenSharing={isScreenSharing}
          selfVideoEnabled={isVideoOn}
          pinnedParticipantId={pinnedParticipantId}
          onTogglePin={togglePinForParticipant}
          className="flex-1"
        />
        
        {/* Participants sidebar */}
        <VideoParticipantList 
          participants={participants}
          activeSpeakerId={activeSpeaker}
          pinnedParticipantId={pinnedParticipantId}
          onTogglePin={togglePinForParticipant}
        />
      </div>
      
      {/* Controls */}
      <VideoControls 
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        isScreenSharing={isScreenSharing}
        isPinned={isSelfPinned}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onToggleScreenShare={toggleScreenShare}
        onTogglePin={togglePin}
        onLeaveCall={leaveCall}
      />
    </div>
  );
};

export default VideoCallScreen;
