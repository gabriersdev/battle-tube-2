import React, {RefObject, useContext} from "react";
import {Button} from "react-bootstrap";
import {Theme} from "@/components/tier-list-context";

interface FullscreenControlProps {
  resultSection: RefObject<HTMLDivElement | null>;
}

export default function FullscreenControl({resultSection}: FullscreenControlProps) {
  const { requestAlert } = useContext(Theme);

  const toggleFullscreen = () => {
    if (resultSection.current) {
      if (!document.fullscreenElement) {
        resultSection.current.requestFullscreen().catch((err) => {
          console.error(`Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    } else requestAlert("Elemento não encontrado ou navegador não suportado.");
  };
  
  return (
    <Button
      variant={"secondary"}
      className={"fs-base text-small align-items-center d-inline-flex gap-1"}
      size={"sm"}
      onClick={toggleFullscreen}
    >
      Tela cheia
    </Button>
  );
}
