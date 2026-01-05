import {Button, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {usePresentation} from "@/components/presentation-provider";
import Link from "next/link";
import Image from "next/image";

export default function Player() {
  const {currentScreen} = usePresentation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<0 | 10 | 25 | 50 | 75 | 100>(10);
  
  const initTime: number | undefined = currentScreen.audio?.initTime;
  const hasAudio: boolean = !!currentScreen.audio;
  const imgSrcMusic: string | undefined = currentScreen.audio?.img.src;
  
  // Reset playing state when screen changes
  useEffect(() => {
    if (hasAudio) setIsPlaying(true);
    else setIsPlaying(false);
  }, [currentScreen.id, hasAudio]);
  
  // Control audio element
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = volume / 100;
      
      // Se o src mudou, precisamos garantir que o elemento de áudio carregue o novo recurso
      // antes de tentar tocar. O React atualiza o atributo src, mas o método play()
      // pode ser chamado antes do navegador estar pronto.
      
      if (isPlaying && hasAudio) {
        // Pequeno delay ou verificação de readyState poderia ajudar, mas o principal
        // é lidar com a promise do play corretamente e garantir que o load() seja chamado se necessário.
        // No entanto, mudar o src no React dispara geralmente o load automaticamente.
        
        const playAudio = async () => {
          try {
            await audioElement.play();
            console.info("[INFO] - Audio tocando...");
          } catch (error) {
            console.warn("[WARN] - Autoplay bloqueado ou erro ao tocar:", error);
            // Não setamos isPlaying(false) imediatamente aqui para evitar loops se for um erro transiente,
            // mas se for "NotAllowedError" (interação do usuário necessária), o usuário terá que clicar no play.
            if ((error as DOMException).name === "NotAllowedError") {
              setIsPlaying(false);
            }
          }
        };
        
        playAudio().then();
        
      } else {
        audioElement.pause();
        console.info("[INFO] - Audio pausado...");
      }
      
      if (initTime) audioElement.currentTime = initTime;
    }
  }, [isPlaying, volume, hasAudio, currentScreen.audio, initTime]);
  
  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        window.scrollTo({
          behavior: 'smooth',
          top: 0
        });
      }, 100);
    }
  }, [currentScreen.id, isPlaying]);
  
  if (!hasAudio) {
    return null;
  }
  
  return (
    <div className={"position-absolute px-2 py-2 rounded"} style={{bottom: "1rem", right: "1rem", border: "1px solid #00000025", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(5px)"}}>
      <div className={"m-0 p-0 d-flex flex-column gap-1"}>
        <span className={"text-small text-body-tertiary"}>Tocando agora</span>
        <div className={'d-flex align-items-center flex-wrap gap-2'}>
          {
            imgSrcMusic && (
              <Image
                src={imgSrcMusic}
                alt={`Capa da faixa ${currentScreen.audio?.name ?? '-'}`}
                width={32}
                height={32}
                className={'object-fit-cover'}
                style={{borderRadius: '0.15rem'}}
              />
            )
          }
          <Link href={currentScreen.audio?.link ?? ""} className={"d-flex gap-0 flex-column text-decoration-none"}>
            <div className={"text-small scroll-wrapper"} style={{maxWidth: "200px"}}>
              <span className={"scroll-text"}>{currentScreen.audio?.name ?? ""} - {currentScreen.audio?.author ?? ""}</span>
            </div>
            <span className={'opacity-50 border-0 fw-normal text-small text-body-tertiary'}>Explict</span>
          </Link>
        </div>
        <div className={"d-flex flex-wrap gap-1 mt-2"}>
          <Button size={"sm"} variant={"secondary"} onClick={() => {
            setIsPlaying(!isPlaying);
          }}>
            <span className={"text-small"}>{isPlaying ? "Pausar" : "Play"}</span>
          </Button>
          
          {/* Key prop forces re-mount of audio element when src changes, which can help with some browser quirks regarding media resource loading */}
          <audio
            key={currentScreen.audio?.src}
            ref={audioRef}
            src={currentScreen.audio?.src}
            className={"d-none"}
            loop={true}
            // onEnded={() => setIsPlaying(false)}
            preload="auto"
          />
          
          <Dropdown>
            <DropdownToggle className={"text-small py-1 px-3"}>Vol.</DropdownToggle>
            <DropdownMenu className={"text-small"}>
              {
                [
                  ["Sem som", 0],
                  ["10", 10]
                ].map((item, index) => (
                  <DropdownItem key={index} onClick={() => {
                    setVolume(item[1]);
                  }}>
                    {item[0]}
                    
                    {volume === item[1] && (
                      <>
                        {" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                          <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                          <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                        </svg>
                      </>
                    )}
                  </DropdownItem>
                ))
              }
              
              {
                Array.from({length: 4}, (_, i) => i + 1).map((i) => {
                  const val = (i * 25) as 25 | 50 | 75 | 100;
                  return (
                    <DropdownItem key={i} onClick={() => {
                      setVolume(val);
                    }}>
                      {val}
                      
                      {val === volume && (
                        <>
                          {" "}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                          </svg>
                        </>
                      )}
                    </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}