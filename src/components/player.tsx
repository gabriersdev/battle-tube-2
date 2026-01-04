import {Button, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import {Dropdown} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {usePresentation} from "@/components/presentation-provider";

export default function Player() {
  const {currentScreen} = usePresentation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<0 | 25 | 50 | 75 | 100>(50);
  
  const hasAudio = !!currentScreen.audioSrc;
  
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
      
      if (isPlaying && hasAudio) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.info("[INFO] - Audio tocando...");
            })
            .catch((error) => {
              console.warn("[WARN] - Autoplay bloqueado ou erro ao tocar:", error);
              setIsPlaying(false);
            });
        }
      } else {
        audioElement.pause();
        console.info("[INFO] - Audio pausado...");
      }
    }
  }, [isPlaying, volume, hasAudio, currentScreen.audioSrc]);
  
  if (!hasAudio) {
    return null;
  }
  
  return (
    <div className={"position-absolute px-2 py-2 rounded"} style={{bottom: "1rem", right: "1rem", border: "1px solid #00000025", backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(5px)"}}>
      <div className={"m-0 p-0 d-flex flex-column gap-1"}>
        <span className={"text-small text-body-tertiary"}>Tocando agora</span>
        <span className={"text-small"}>Áudio da Apresentação</span>
        <div className={"d-flex flex-wrap gap-1 mt-2"}>
          <Button size={"sm"} variant={"secondary"} onClick={() => {
            setIsPlaying(!isPlaying);
          }}>
            <span className={"text-small"}>{isPlaying ? "Pausar" : "Play"}</span>
          </Button>
          
          <audio
            ref={audioRef}
            src={currentScreen.audioSrc}
            className={"d-none"}
            onEnded={() => setIsPlaying(false)}
          />
          
          <Dropdown>
            <DropdownToggle className={"text-small py-1 px-3"}>Vol.</DropdownToggle>
            
            <DropdownMenu className={"text-small"}>
              <DropdownItem onClick={() => {
                setVolume(0);
              }}>
                Sem som
                
                {volume === 0 && (
                  <>
                    {" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                      <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                    </svg>
                  </>
                )}
              </DropdownItem>
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