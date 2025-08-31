"use client";

import React, { useState } from "react";
import { DrawSignature } from "./DrawSignature";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UploadSignatureProps {
  onSignatureChange?: (signature: string | null) => void;
}

export const UploadSignature: React.FC<UploadSignatureProps> = ({ onSignatureChange }) => {
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSignature(result);
        if (onSignatureChange) {
          onSignatureChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrawnSignature = (drawnSignature: string | null) => {
    setSignature(drawnSignature);
    if (onSignatureChange) {
      onSignatureChange(drawnSignature);
    }
  };

  return (
    <>
      <Label>Firma del Consumidor</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <Input type="file" accept="image/*" onChange={handleSignatureUpload} />
        <section className="flex flex-col items-center w-full relative">
          <div className="md:absolute top-0 left-1 p-2 bg-transparent">
            O dibuje su firma
          </div>
          <DrawSignature onSignatureChange={handleDrawnSignature} />
        </section>
      </div>
      {signature && (
        <img src={signature} alt="Firma cargada" className="mt-2 max-w-xs" />
      )}
    </>
  );
};
