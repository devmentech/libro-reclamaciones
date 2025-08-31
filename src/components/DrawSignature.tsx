"use client";

import React, { useRef, useState } from "react";

interface DrawSignatureProps {
  onSignatureChange?: (signature: string | null) => void;
}

export const DrawSignature: React.FC<DrawSignatureProps> = ({ onSignatureChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const startDrawing = () => setIsDrawing(true);
  
  const stopDrawing = () => {
    setIsDrawing(false);
    // Exportar la firma cuando se termine de dibujar
    if (canvasRef.current && onSignatureChange) {
      const dataUrl = canvasRef.current.toDataURL();
      onSignatureChange(dataUrl);
    }
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      if ("touches" in event) {
        const touch = event.touches[0];
        const rect = canvas?.getBoundingClientRect();
        const x = touch.clientX - (rect?.left ?? 0);
        const y = touch.clientY - (rect?.top ?? 0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={150}
      className="libro-reclamaciones-signature-canvas w-full mx-0"
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={stopDrawing}
      onTouchMove={draw}
    />
  );
};
