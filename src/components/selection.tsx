import {Button, DropdownMenu, DropdownToggle, Spinner} from "react-bootstrap";
import React, {useCallback, useContext, useRef, useState} from "react";
import html2canvas from "html2canvas";

import FullscreenControl from "@/components/fullscreen-component";
import {Theme} from "@/components/tier-list-context";
import Lib from "@/utils/lib";
import {Dropdown} from "@restart/ui";

export default function Selection() {
  const tierListContainer = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const {
    items,
    setItems,
    tiers,
    sectionRef,
    activeDropZone,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    renderDraggableItems,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetTierList,
    requestConfirm,
    requestAlert
  } = useContext(Theme);
  
  const downloadTierImg = useCallback(async () => {
    if (!tierListContainer.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(tierListContainer.current, {
        useCORS: true,
        allowTaint: true,
        background: "transparent", // Fundo transparente
        // scale: 2, // Maior resolução
        logging: false,
        // @ts-ignore
        onclone: (clonedDoc: { querySelector: (arg0: string) => HTMLElement; }) => {
          const element = clonedDoc.querySelector('.tier-list-container') as HTMLElement;
          if (element) {
            element.style.overflow = "visible";
            element.style.height = "auto";
            element.style.maxHeight = "none";
            
            const children = element.querySelectorAll('*');
            children.forEach((child) => {
              if (child instanceof HTMLElement) {
                child.style.overflow = "visible";
                child.style.lineHeight = "1";
              }
            });
          }
        }
      });
      
      // Converte canvas para blob
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `tier-list-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Erro ao gerar imagem da tier list:', error);
      requestAlert('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setIsDownloading(false);
    }
  }, [requestAlert]);
  
  return (
    <div className={"d-flex flex-column gap-3"} ref={sectionRef}>
      <div className={"d-flex gap-2 flex-wrap align-items-center justify-content-between"}>
        <div>
          <p className={"m-0 p-0 text-small"}>
            <span className={"text-body-tertiary"}>
              Na Tier List:{" "}
            </span>
            <span className={"text-body-secondary"}>
              {Lib.greaterThan(items.filter(i => i.tier !== "pool").length, 0, "nenhum clipe")}
            </span>
          </p>
          <p className={"m-0 p-0 text-small"}>
              <span className={"text-body-tertiary"}>
                Para classificar:{" "}
              </span>
            <span className={"text-body-secondary"}>
              {Lib.greaterThan(items.filter(i => i.tier === "pool").length, 0, "nenhum clipe")}
            </span>
          </p>
        </div>
        
        <Dropdown>
          <DropdownToggle
            variant="success"
            id="dropdown-basic"
            size={"sm"}
            className={"text-small"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </DropdownToggle>
          
          <DropdownMenu>
            <div className={"d-flex gap-2 px-2 flex-wrap align-items-center"}>
              <Button
                variant={"primary"}
                className={"fs-base text-small align-items-center d-inline-flex gap-1"}
                size={"sm"}
                onClick={downloadTierImg}
                disabled={isDownloading}
              >
                Baixar
                <Spinner animation="border" size={"sm"} className={isDownloading ? "" : "d-none"}/>
              </Button>
              
              <FullscreenControl resultSection={sectionRef}/>
              
              <Button
                variant={"danger"}
                size={"sm"}
                className={"fs-base text-small align-items-center d-inline-flex gap-1"}
                onClick={() => {
                  requestConfirm('Tem certeza que deseja limpar a tier list? Tudo será perdido.', resetTierList);
                }}
                disabled={tiers?.length === 0}
              >
                Limpar
              </Button>
              
              {/* Controles de LocalStorage */}
              <Button
                variant={"secondary"}
                size={"sm"}
                className={"d-none fs-base text-small align-items-center d-inline-flex gap-1"}
                onClick={() => {
                  try {
                    const loadedItems = loadFromLocalStorage();
                    setItems(loadedItems);
                    console.log('Dados carregados do localStorage!');
                  } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                    requestAlert('Erro ao carregar dados salvos.');
                  }
                }}
              >
                Carregar
              </Button>
              
              
              <Button
                variant={"primary"}
                size={"sm"}
                className={"d-none fs-base text-small align-items-center d-inline-flex gap-1"}
                onClick={() => {
                  saveToLocalStorage(items);
                  console.log('Dados salvos localmente!');
                }}
              >
                Salvar
              </Button>
            
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
      
      <div
        className="tier-list-container rounded-1 border overflow-y-auto overflow-x-auto bg-body"
        ref={tierListContainer}
      >
        {/* Renderiza as linhas da Tier List dinamicamente */}
        {tiers?.map((tier) => (
          // TODO - corrigir identificação da linha da tier list - não aparece corretamente
          <div
            key={tier}
            className={`tier-list d-flex ${tier.toLowerCase()} box ${
              activeDropZone === tier ? 'detect' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, tier)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, tier)}
          >
            <span className={"font-radio-canada h-full d-block"} style={{minWidth: "70px"}}>{tier}</span>
            <div className={"d-flex flex-wrap p-1"}>
              {renderDraggableItems(tier)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Container de Itens (Pool Inicial) */}
      <div
        id="draggable-elements-container"
        className={`box d-flex flex-wrap rounded-1 border  overflow-y-scroll bg-body-secondary ${activeDropZone === 'pool' ? 'detect' : ''}`}
        onDragOver={(e) => handleDragOver(e, 'pool')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'pool')}
        style={{minHeight: '100px', marginTop: '20px', border: '1px dashed #ccc'}}
      >
        {renderDraggableItems('pool')}
      </div>
    </div>
  )
}
