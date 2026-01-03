'use client';

import React, {createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef} from 'react';
import {ScreenData, presentationData} from '@/resources/presentation';

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
  const [remainingTime, setRemainingTime] = useState(0);
  
  const currentScreen = presentationData[currentScreenIndex];
  const totalScreens = presentationData.length;
  
  // Refs para controle preciso do timer sem re-renders excessivos
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);
  
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
      startTimer(remainingTimeRef.current);
      setIsPlaying(true);
    }
  }, [isPlaying, pauseTimer, startTimer]);
  
  // Efeito principal: Monitora mudança de slide
  useEffect(() => {
    const durationMs = currentScreen.duration * 1000;
    
    // Sempre reseta o tempo restante ao mudar de slide
    remainingTimeRef.current = durationMs;
    setRemainingTime(durationMs);
    
    if (isPlaying) {
      startTimer(durationMs);
    }
    
    return () => clearPresentationTimer();
  }, [currentScreenIndex, currentScreen.duration]); // Removido isPlaying e startTimer das deps para evitar loops ou resets indesejados
  
  // Nota: Não incluímos startTimer nas dependências do useEffect acima intencionalmente
  // para evitar que a recriação da função dispare o efeito. 
  // Mas como startTimer usa useCallback, é seguro adicionar se o linter reclamar, 
  // porém a lógica de "isPlaying" já controla se deve iniciar ou não.
  
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
