"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Video, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

function ARCameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function getCameraPermission() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Dispositivo no compatible",
          description: "Tu navegador no soporta el acceso a la cámara.",
        });
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Acceso a la cámara denegado",
          description: "Por favor, habilita los permisos de la cámara en tu navegador.",
        });
      }
    }

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);

  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
      
      {hasCameraPermission === true && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4 text-center">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">¡Bienvenido a mi CV Interactivo!</h3>
            <p className="text-white/90 mt-2 drop-shadow-lg">(Simulación de Experiencia AR)</p>
        </div>
      )}

      {hasCameraPermission === false && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Alert variant="destructive">
            <VideoOff className="h-4 w-4" />
            <AlertTitle>Cámara no disponible</AlertTitle>
            <AlertDescription>
                No se pudo acceder a la cámara. Por favor, revisa los permisos en tu navegador.
            </AlertDescription>
          </Alert>
        </div>
      )}

       {hasCameraPermission === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <p>Solicitando acceso a la cámara...</p>
        </div>
       )}
    </div>
  );
}


export default function InnovationSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="innovation" className="container py-12 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-headline font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-accent" />
          Innovación y Creatividad
        </h2>
      </div>

      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-headline font-semibold mb-4 text-primary">Realidad Aumentada en tu Tarjeta</h3>
        <p className="text-muted-foreground mb-6">
          Imagina apuntar con tu móvil a mi tarjeta de visita y que mi avatar 3D aparezca para darte la bienvenida. Esa es una de las ideas que me apasiona desarrollar para fusionar el mundo físico y digital. Pulsa el botón para ver una simulación de la experiencia.
        </p>
        <Button onClick={() => setIsDialogOpen(true)}>
            <Video className="mr-2"/>
            Probar Simulación AR
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Demostración de Realidad Aumentada</DialogTitle>
            <DialogDescription>
              Esta es una simulación que activa tu cámara para mostrar cómo podría comenzar una experiencia de AR.
            </DialogDescription>
          </DialogHeader>
          
          <ARCameraView />

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
