'use client';

import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef} from 'react';
import {ScreenData, presentationData} from '@/resources/presentation';
import {useRouter} from 'next/navigation';

interface PresentationContextType {
  currentScreenIndex: number;
  totalScreens: number;
  currentScreen: ScreenData;
  nextScreen: () => void;
  previousScreen: () => void;
  goToScreen: (index: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  remainingTime: number; // Tempo restante em ms para o slide atual
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

export const usePresentation = () => {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error('usePresentation must be used within a PresentationProvider');
  }
  return context;
};

interface PresentationProviderProps {
  children: ReactNode;
}

export const PresentationProvider: React.FC<PresentationProviderProps> = ({children}) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // Initialize with first screen duration to avoid immediate re-render on mount
  const [remainingTime, setRemainingTime] = useState(presentationData[0]?.duration * 1000 || 0);
  const router = useRouter();
  
  const currentScreen = presentationData[currentScreenIndex];
  const totalScreens = presentationData.length;
  
  // Refs para controle preciso do timer sem re-renders excessivos
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(presentationData[0]?.duration * 1000 || 0);
  
  // State to track screen changes for resetting timer/state during render
  const [lastScreenIndex, setLastScreenIndex] = useState(0);
  
  if (currentScreenIndex !== lastScreenIndex) {
    setLastScreenIndex(currentScreenIndex);
    const durationMs = currentScreen.duration * 1000;
    setRemainingTime(durationMs);
  }
  
  const clearPresentationTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const nextScreen = useCallback(() => {
    setCurrentScreenIndex((prev) => (prev + 1) % presentationData.length);
  }, []);
  
  const previousScreen = useCallback(() => {
    setCurrentScreenIndex((prev) => (prev - 1 + presentationData.length) % presentationData.length);
  }, []);
  
  const goToScreen = useCallback((index: number) => {
    if (index >= 0 && index < presentationData.length) {
      setCurrentScreenIndex(index);
    }
  }, []);
  
  // Inicia o timer com uma duração específica
  const startTimer = useCallback((durationMs: number) => {
    clearPresentationTimer();
    startTimeRef.current = Date.now();
    remainingTimeRef.current = durationMs;
    setRemainingTime(durationMs); // Atualiza UI
    
    timerRef.current = setTimeout(() => {
      nextScreen();
    }, durationMs);
  }, [nextScreen]);
  
  // Pausa o timer e calcula o tempo restante
  const pauseTimer = useCallback(() => {
    clearPresentationTimer();
    const elapsed = Date.now() - startTimeRef.current;
    const newRemaining = Math.max(0, remainingTimeRef.current - elapsed);
    remainingTimeRef.current = newRemaining;
    setRemainingTime(newRemaining); // Atualiza UI com o tempo que sobrou
  }, []);
  
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseTimer();
      setIsPlaying(false);
    } else {
      // Ao retomar, usamos o tempo restante armazenado na ref
      startTimer(remainingTimeRef.current);
      setIsPlaying(true);
    }
  }, [isPlaying, pauseTimer, startTimer]);
  
  const finishPresentation = useCallback(() => {
    router.push('/'); // Redireciona para a home ou outra página de finalização
  }, [router]);
  
  // Efeito principal: Monitora mudança de slide
  useEffect(() => {
    const durationMs = currentScreen.duration * 1000;
    
    if (isPlaying) startTimer(durationMs);
    else {
      // Se estiver pausado ao mudar de slide (ex: navegação manual),
      // garantimos que o timer esteja limpo e o tempo restante seja o total do novo slide
      clearPresentationTimer();
      remainingTimeRef.current = durationMs;
    }
    
    return () => clearPresentationTimer();
  }, [currentScreenIndex, currentScreen.duration]); // Removido isPlaying das dependências para evitar reset do timer ao pausar/retirar pausar
  
  // Listener de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora se o foco estiver em um input ou textarea
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        return;
      }
      
      // Evento de escuta de alterações e cliques no teclado
      switch (event.key.toLowerCase()) {
        case ' ': // Espaço
        case 'p':
          togglePlay();
          break;
        case 'v':
        case 'b':
          previousScreen();
          break;
        case 'n':
        case 'ArrowRight':
          nextScreen();
          break;
        case 'ArrowLeft':
          previousScreen();
          break;
        case 's':
        case 'f':
          finishPresentation();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, nextScreen, previousScreen, finishPresentation]);
  
  return (
    <PresentationContext.Provider
      value={{
        currentScreenIndex,
        totalScreens,
        currentScreen,
        nextScreen,
        previousScreen,
        goToScreen,
        isPlaying,
        togglePlay,
        remainingTime,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};
