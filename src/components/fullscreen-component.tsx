import {Button} from "react-bootstrap";
import React, {useState, useEffect, Ref} from "react";

// Definindo a interface para as props
interface FullscreenControlProps {
  // RefObject<HTMLElement> aceita divs, sections, etc.
  resultSection: React.RefObject<HTMLElement | null>;
}

export default function FullscreenControl({resultSection}: FullscreenControlProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  useEffect(() => {
    // Função para atualizar o estado quando o navegador entra/sai de tela cheia
    const handleFullscreenChange = () => {
      // Verifica se existe algum elemento em tela cheia E se é o nosso elemento (opcional, mas seguro)
      // Ou simplesmente verifique se há algo em tela cheia: !!document.fullscreenElement
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    // Adiciona o ouvinte de evento
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    // Limpa o ouvinte ao desmontar
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [resultSection]);
  
  const handleEnterFullscreen = () => {
    if (resultSection?.current) {
      resultSection.current.requestFullscreen()
        .then(() => console.log("Entrou no modo tela cheia com sucesso!"))
        .catch((err: unknown) => console.error("Erro ao entrar no modo tela cheia:", err));
    } else {
      alert("Elemento não encontrado ou navegador não suportado.");
    }
  };
  
  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => console.log("Saiu do modo tela cheia com sucesso!"))
        .catch((err: unknown) => console.error("Erro ao sair do modo tela cheia:", err));
    }
  };
  
  return (
    <div className="d-flex align-items-center flex-wrap gap-2">
      {!isFullscreen ? (
        <Button
          variant={"secondary"} className={"fs-base text-small"} size={"sm"}
          onClick={handleEnterFullscreen}
        >
          <i className="bi bi-fullscreen"></i>
          <span className="d-none d-md-inline-block text-sml">Tela cheia</span>
        </Button>
      ) : (
        <Button
          variant={"secondary"} className={"fs-base text-small"} size={"sm"}
          onClick={handleExitFullscreen}
        >
          <i className="bi bi-fullscreen-exit"></i>
          <span className="d-none d-md-inline-block text-sml">Sair da tela cheia</span>
        </Button>
      )}
    </div>
  );
}
