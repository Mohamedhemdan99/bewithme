
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Globe, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import * as THREE from 'three';

const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const headModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    sceneRef.current.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(directionalLight);

    // Create a simple 3D head representation
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xf5d0c5 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    headModelRef.current = new THREE.Group();
    headModelRef.current.add(head);
    sceneRef.current.add(headModelRef.current);

    cameraRef.current.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (headModelRef.current) {
        headModelRef.current.rotation.y += 0.005;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const handleTranslate = () => {
    console.log('Translating:', inputText);
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">Translation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or speak your text here..."
                className="min-h-[200px] text-gray-900 placeholder:text-gray-500"
              />
              <Button
                onClick={toggleMicrophone}
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className="h-12 w-12"
              >
                <Mic className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleTranslate}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium"
              >
                <Globe className="h-5 w-5 mr-2" />
                Translate
              </Button>
              <Button
                onClick={speakText}
                variant="outline"
                className="flex-1"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                Speak
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div
            ref={containerRef}
            className="w-full aspect-square rounded-lg overflow-hidden"
          />
        </Card>
      </div>
    </div>
  );
};

export default Translation;
