import React, {DragEvent, useRef, useState, useEffect} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import clipsData from "@/resources/data.json";
import Lib from "@/utils/lib";
import {it} from "node:test";

type TierLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

interface TierItem {
  id: string;
  tier: TierLevel | 'pool';
  
  title?: string;
  originalTitle?: string;
  author?: string;
  platform?: string;
  publishDatetime?: string;
  url: string;
  className?: string;
}

interface ClipData {
  views: number;
  clipper: string | null;
  date: string;
  title: string;
  url: string;
}

const initialItems: TierItem[] = (clipsData as ClipData[]).map((item, index) => ({
  id: index.toString(),
  tier: 'pool',
  title: item.title,
  author: item.clipper || undefined,
  publishDatetime: item.date,
  url: item.url,
  className: ''
}));

const tiers: TierLevel[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

const STORAGE_KEY = 'battle-tube-tier-list-v2';

export function UseTierList() {
  // Estado que guarda onde cada item está
  const [items, setItems] = useState<TierItem[]>(() => {
    // Tenta carregar do localStorage na inicialização
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialItems;
      } catch (error) {
        console.warn('Erro ao carregar tier list do localStorage:', error);
        return initialItems;
      }
    }
    return initialItems;
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Estado para controle visual de onde estamos arrastando (highlight)
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  
  const [show, setShow] = useState(false);
  const [showClipData, setShowClipData] = useState<TierItem | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  
  // Funções de localStorage
  const saveToLocalStorage = (itemsToSave: TierItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Erro ao salvar tier list no localStorage:', error);
    }
  };
  
  const loadFromLocalStorage = (): TierItem[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialItems;
    } catch (error) {
      console.warn('Erro ao carregar tier list do localStorage:', error);
      return initialItems;
    }
  };
  
  const resetTierList = () => {
    setItems(initialItems);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover tier list do localStorage:', error);
    }
  };
  
  // Salva automaticamente no localStorage quando items mudam
  useEffect(() => {
    saveToLocalStorage(items);
  }, [items]);
  
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
  
  const showClip = (data: TierItem) => {
    console.log(data);
    setShowClipData(data);
    setShowModal(true);
  }
  
  // Função auxiliar para renderizar os itens numa zona
  const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
    
    
    return items
      .filter((item) => item.tier === currentTier)
      .map((item: TierItem, index) => {
        console.log(Lib.getClipID(item));
        
        return (
          <OverlayTrigger key={index} overlay={
            <Tooltip>
            <span className={"m-0 p-0 d-block text-small font-inter line-clamp-2 text-balance"}>
              {item.title || "Arraste para a lista ou clique para abrir o clipe."}
            </span>
            </Tooltip>
          }>
            <div
              id={`draggable-element${item.id}`}
              className={`draggable-element border-0 p-1 rounded-2 m-0 ${item.className}`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onClick={() => showClip(item)}
            >
              {item.title}
            </div>
          </OverlayTrigger>
        )
      });
  };
  
  return {
    items,
    setItems,
    sectionRef,
    activeDropZone,
    setActiveDropZone,
    show,
    setShow,
    handleClose,
    handleShow,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    renderDraggableItems,
    tiers,
    saveToLocalStorage,
    loadFromLocalStorage,
    resetTierList,
    
    // Modal e suas informações
    showClip,
    showClipData,
    setShowClipData,
    showModal,
    setShowModal
  }
}

export {
  initialItems,
  tiers
};

export type {
  TierLevel,
  TierItem,
  ClipData
};
