import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeftIcon, CameraIcon, SpinnerIcon } from './icons';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Prefer rear camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
              setError('Camera permission was denied. Please allow camera access in your browser settings.');
          } else if (err.name === 'NotFoundError') {
              setError('No camera found. Please ensure a camera is connected and enabled.');
          } else {
              setError('An error occurred while accessing the camera. Please try again.');
          }
      } else {
          setError('An unknown error occurred.');
      }
    } finally {
        setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video to ensure full capture
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = canvas.toDataURL('image/jpeg', 0.9); // High quality JPEG
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        onCanPlay={() => setIsInitializing(false)}
      />
      <canvas ref={canvasRef} className="hidden" />

      {isInitializing && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white">
          <SpinnerIcon className="w-12 h-12 mb-4" />
          <p>Starting camera...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Camera Error</h2>
            <p>{error}</p>
            <button
                onClick={onCancel}
                className="mt-6 bg-slate-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
            >
                Go Back
            </button>
        </div>
      )}

      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/50 to-transparent">
        <button 
          onClick={onCancel} 
          className="text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent flex justify-center">
        <button
          onClick={handleCapture}
          disabled={!!error || isInitializing}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform"
          aria-label="Capture photo"
        >
          <CameraIcon className="w-10 h-10 text-slate-800" />
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
