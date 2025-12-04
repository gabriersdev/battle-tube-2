"use client";

import React, {useState, DragEvent} from 'react';
import {Button, OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";
import Link from "next/link";

type TierLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

interface TechItem {
  id: string;
  className: string;
  tier: TierLevel | 'pool';
}

const tiers: TierLevel[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

const initialItems: TechItem[] = [
  {id: '1', className: 'js', tier: 'pool'},
  {id: '2', className: 'html', tier: 'pool'},
  {id: '3', className: 'css', tier: 'pool'},
  {id: '4', className: 'python', tier: 'pool'},
  {id: '5', className: 'php', tier: 'pool'},
  {id: '6', className: 'scratch', tier: 'pool'},
  {id: '7', className: 'cpp', tier: 'pool'},
  {id: '8', className: 'java', tier: 'pool'},
  {id: '9', className: 'ruby', tier: 'pool'},
];

export default function TierList() {
  // Estado que guarda onde cada item está
  const [items, setItems] = useState<TechItem[]>(initialItems);
  
  // Estado para controle visual de onde estamos arrastando (highlight)
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  
  // Handlers de Drag and Drop
  const handleDragStart = (e: DragEvent<HTMLDivElement>, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>, zoneId: string) => {
    e.preventDefault(); // Necessário para permitir o drop
    setActiveDropZone(zoneId); // Ativa o highlight visual
  };
  
  const handleDragLeave = () => {
    setActiveDropZone(null); // Remove highlight
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>, targetTier: TierLevel | 'pool') => {
    e.preventDefault();
    setActiveDropZone(null);
    
    const draggedItemId = e.dataTransfer.getData('text/plain');
    
    // Atualiza o estado movendo o item para a nova tier
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === draggedItemId ? {...item, tier: targetTier} : item
      )
    );
  };
  
  // Função auxiliar para renderizar os itens numa zona
  const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
    return items
      .filter((item) => item.tier === currentTier)
      .map((item, index) => (
        <OverlayTrigger key={index} overlay={
          <Tooltip>
            <span className={"m-0 p-0 d-block text-small font-inter line-clamp-2"}>
              Arraste para a lista ou clique para abrir o clipe. Clicar duas vezes abre em uma nova aba.
            </span>
          </Tooltip>
        }>
          <div
            id={`draggable-element${item.id}`}
            className={`draggable-element ${item.className}`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, item.id)}
          />
        </OverlayTrigger>
      ));
  };
  
  return (
    <main className={"container my-5 d-flex flex-column gap-5"}>
      <hgroup className={"text-center mx-auto"} style={{maxWidth: "600px"}}>
        <h1 className={"text-balance font-inter-tight fw-semibold"}>Tier List dos melhores clipes da live em 2025</h1>
      </hgroup>
      <div className={"d-flex flex-column gap-3"}>
        <div className={"d-flex gap-2 flex-wrap align-items-center justify-content-between"}>
          <div>
            <p className={"m-0 p-0 text-small"}>
              <span className={"text-body-tertiary"}>
                Na Tier List:{" "}
              </span>
              <span className={"text-body-secondary"}>
                nenhum clipe
              </span>
            </p>
            <p className={"m-0 p-0 text-small"}>
              <span className={"text-body-tertiary"}>
                Para classificar:{" "}
              </span>
              <span className={"text-body-secondary"}>
                nenhum clipe
              </span>
            </p>
          </div>
          <div className={"d-flex gap-2 flex-wrap align-items-center"}>
            <Button variant={"primary"} className={"fs-base text-small align-items-center d-inline-flex gap-1"} size={"sm"} onClick={() => {
            }}>
              Baixar
              <Spinner animation="border" size={"sm"} />
            </Button>
            
            <Button variant={"secondary"} className={"fs-base text-small"} size={"sm"} onClick={() => {
            }}>
              Tela cheia
            </Button>
          </div>
        </div>
        
        <div className="tier-list-container rounded-1 border">
          {/* Renderiza as linhas da Tier List dinamicamente */}
          {tiers.map((tier) => (
            <div
              key={tier}
              className={`tier-list ${tier.toLowerCase()} box ${
                activeDropZone === tier ? 'detect' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, tier)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, tier)}
            >
              <span className={"font-radio-canada"}>{tier}</span>
              {renderDraggableItems(tier)}
            </div>
          ))}
        </div>
        
        {/* Container de Itens (Pool Inicial) */}
        <div
          id="draggable-elements-container"
          className={`box d-flex flex-wrap rounded-1 border p-3 overflow-y-scroll bg-body-secondary ${activeDropZone === 'pool' ? 'detect' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'pool')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'pool')}
          style={{minHeight: '100px', marginTop: '20px', border: '1px dashed #ccc'}}
        >
          {renderDraggableItems('pool')}
        </div>
      </div>
      
      <p className={"m-0 text-center text-body-secondary text-balance"}>
        Não se preocupe, conforme você interage com a Tier List o progresso é salvo no navegador. Ao usar a Tier List, você concorda com o armazenamento de alguns dados no navegador para aprimorar sua experiência, realizar análises de performance, corrigir erros e identificar bugs.
      </p>
      
      <div className={"d-flex gap-2 flex-wrap align-items-center justify-content-center"}>
        <Button variant={"primary"} className={"fs-base"} onClick={() => {
          if (localStorage) localStorage.clear();
          if (sessionStorage) sessionStorage.clear();
          window.location.reload();
        }}>
          Limpar dados salvos no navegador
        </Button>
        
        <Link href={"#"}>
          <Button variant={"secondary"} className={"fs-base"}>
            Informar um erro
          </Button>
        </Link>
        
        <Link href={"#"}>
          <Button variant={"secondary"} className={"fs-base"}>
            Fazer minha própria Tier List
          </Button>
        </Link>
        
        <Link href={"#"}>
          <Button variant={"secondary"} className={"fs-base"}>
            Repositório no Github
          </Button>
        </Link>
      </div>
    </main>
  );
}