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
  const [remainingTime, setRemainingTime] = useState(0);
  const router = useRouter();
  
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

  const finishPresentation = useCallback(() => {
    router.push('/'); // Redireciona para a home ou outra página de finalização
  }, [router]);
  
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
  
  // Listener de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora se o foco estiver em um input ou textarea
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ': // Espaço
        case 'p': // Pause/Play (se for 'p' e não estiver pausado, pausa. Se estiver pausado, toca. Mas o requisito diz 'p' para pausar E 'p' para next? Vou assumir togglePlay para espaço e 'p' para next conforme pedido, mas 'p' para pause é comum. O pedido diz: "p ou espaco para pausar" E "p ou n para ir para a proxima". Há um conflito na letra 'p'. Vou priorizar 'p' para pause/play como espaço, e usar 'n' para next. Se o usuário quiser 'p' para next, terá que ser diferente.
        // Re-lendo: "p ou espaco para pausar a apresentacao" E "p ou n para ir para a proxima apresentacao".
        // Isso é ambíguo. Vou assumir:
        // Espaço -> Toggle Play/Pause
        // 'k' -> Toggle Play/Pause (alternativa comum)
        // 'p' -> Toggle Play/Pause (conforme pedido 1)
        // 'n' -> Next (conforme pedido 4)
        // 'l' -> Next (alternativa comum)
        // 'v' ou 'b' -> Previous (conforme pedido 2)
        // 's' ou 'f' -> Finish (conforme pedido 3)
        
        // Vou ajustar para:
        // Espaço: Toggle Play
        // 'p': Toggle Play (conforme pedido 1, ignorando o conflito com pedido 4 por enquanto, ou melhor, vou usar 'n' para next e ignorar 'p' para next para evitar conflito direto, ou verificar se está pausado.
        // O pedido diz explicitamente: "p ou espaco para pausar" e "p ou n para ir para a proxima".
        // Vou usar 'p' para PAUSAR/PLAY. E 'n' para NEXT. Se o usuário apertar 'p', vai pausar/despausar.
        
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
