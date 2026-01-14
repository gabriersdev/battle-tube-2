import React, {DragEvent, useRef, useState, useEffect, TouchEvent} from "react";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import clipsData from "@/resources/data.json";
import Lib from "@/utils/lib";
import Image from "next/image";

import TwitchLogo from "../..//public/twitch.jpg";
import KickLogo from "../../public/kick.svg";
import VoidUser from "@/components/void-user";

type TierLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface TierItem {
  id: string;
  tier: TierLevel | 'pool';
  
  title: string;
  originalTitle?: string;
  author?: string;
  platform?: string;
  publishDatetime?: string;
  url: string;
  className?: string;
  color?: string;
  viewed?: boolean;
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
  className: '',
  color: Lib.getBSColor(index),
  viewed: false
}));

const tiers: TierLevel[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];

const STORAGE_KEY_TIER_ITEMS = 'battle-tube-tier-list-v2-items';

export function UseTierList() {
  // Estado que guarda onde cada item está
  const [items, setItems] = useState<TierItem[]>(initialItems);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastViewedId, setLastViewedId] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIER_ITEMS);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        // Ensure color exists for backward compatibility
        const itemsWithColor = parsedItems.map((item: TierItem) => ({
          ...item,
          color: item.color ?? Lib.getBSColor(parseInt(item.id)),
          viewed: item.viewed ?? false
        }));
        setItems(itemsWithColor);
      } else {
        // Embaralha apenas no cliente após a montagem se não houver salvo
        setItems(prevItems => Lib.shuffled([...prevItems]));
      }
    } catch (error) {
      console.warn('Erro ao carregar tier list do localStorage:', error);
      // Em caso de erro, garante que embaralha
      setItems(prevItems => Lib.shuffled([...prevItems]));
    } finally {
      setIsLoaded(true);
    }
  }, []);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Estado para controle visual de onde estamos arrastando (highlight)
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  
  const [show, setShow] = useState(false);
  const [showClipData, setShowClipData] = useState<TierItem | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  
  // Confirmation/Alert Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {
  });
  const [dialogType, setDialogType] = useState<'confirm' | 'alert'>('confirm');
  
  const requestConfirm = (message: string, action: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setDialogType('confirm');
    setShowConfirmModal(true);
  };
  
  const requestAlert = (message: string) => {
    setConfirmMessage(message);
    setConfirmAction(() => {
    });
    setDialogType('alert');
    setShowConfirmModal(true);
  };
  
  const handleConfirm = () => {
    if (dialogType === 'confirm') {
      confirmAction();
    }
    setShowConfirmModal(false);
  };
  
  const handleCloseConfirm = () => setShowConfirmModal(false);
  
  // Funções de localStorage
  const saveToLocalStorage = (itemsToSave: TierItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY_TIER_ITEMS, JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Erro ao salvar tier list no localStorage:', error);
    }
  };
  
  const loadFromLocalStorage = (): TierItem[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIER_ITEMS);
      return saved ? JSON.parse(saved) : initialItems;
    } catch (error) {
      console.warn('Erro ao carregar tier list do localStorage:', error);
      return initialItems;
    }
  };
  
  const resetTierList = () => {
    setItems(initialItems);
    try {
      localStorage.removeItem(STORAGE_KEY_TIER_ITEMS);
    } catch (error) {
      console.error('Erro ao remover tier list do localStorage:', error);
    }
  };
  
  // Salva automaticamente no localStorage quando items mudam
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(items);
    }
  }, [items, isLoaded]);
  
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
    
    // Move o item para o final da lista para garantir que ele seja renderizado por último (append)
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(i => i.id === draggedItemId);
      if (itemIndex === -1) return prevItems;
      
      const item = {...prevItems[itemIndex], tier: targetTier};
      const newItems = [...prevItems];
      newItems.splice(itemIndex, 1);
      newItems.push(item);
      return newItems;
    });
  };
  
  // Mobile Touch Handlers
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number, y: number } | null>(null);
  
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>, itemId: string) => {
    // Prevent scrolling while dragging
    // e.preventDefault(); // This might block scrolling entirely, be careful
    setDraggedItem(itemId);
    const touch = e.touches[0];
    setTouchPosition({x: touch.clientX, y: touch.clientY});
  };
  
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!draggedItem) return;
    
    const touch = e.touches[0];
    setTouchPosition({x: touch.clientX, y: touch.clientY});
    
    // Find element under touch
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;
    
    // Find the closest drop zone
    const dropZone = element.closest('.box') as HTMLElement;
    if (dropZone) {
      // Extract tier from class or id or data attribute
      // In your current implementation, drop zones have classes like 'S', 'A', etc.
      // We need a way to identify the tier.
      // Let's assume we can get it from the class list, or we can add a data attribute to the drop zones.
      
      // Checking classes for tier match
      let foundTier: string | null = null;
      if (dropZone.id === 'draggable-elements-container') foundTier = 'pool';
      else {
        for (const tier of tiers) {
          if (dropZone.classList.contains(tier.toLowerCase())) {
            foundTier = tier;
            break;
          }
        }
      }
      
      if (foundTier) {
        setActiveDropZone(foundTier);
      } else {
        setActiveDropZone(null);
      }
    } else {
      setActiveDropZone(null);
    }
  };
  
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!draggedItem) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element) {
      const dropZone = element.closest('.box') as HTMLElement;
      if (dropZone) {
        let targetTier: TierLevel | 'pool' | null = null;
        
        // Identify tier
        // Note: The 'pool' container has id="draggable-elements-container" and likely class 'pool' isn't explicitly set as a class name for identification in the same way tiers are, 
        // but let's check how it's rendered in Selection.tsx
        
        // In Selection.tsx:
        // Tiers: className={`tier-list d-flex ${tier.toLowerCase()} box ...`}
        // Pool: className={`box ...`} (doesn't seem to have 'pool' class explicitly for identification logic above, but let's check)
        
        // We might need to rely on the fact that we know the tiers.
        
        if (dropZone.id === 'draggable-elements-container') {
          targetTier = 'pool';
        } else {
          for (const tier of tiers) {
            if (dropZone.classList.contains(tier.toLowerCase())) {
              targetTier = tier;
              break;
            }
          }
        }
        
        if (targetTier) {
          setItems((prevItems) => {
            const itemIndex = prevItems.findIndex(i => i.id === draggedItem);
            if (itemIndex === -1) return prevItems;
            
            const item = {...prevItems[itemIndex], tier: targetTier!};
            const newItems = [...prevItems];
            newItems.splice(itemIndex, 1);
            newItems.push(item);
            return newItems;
          });
        }
      }
    }
    
    setDraggedItem(null);
    setTouchPosition(null);
    setActiveDropZone(null);
  };
  
  const showClip = (data: TierItem) => {
    console.log(data);
    setShowClipData(data);
    setShowModal(true);
    
    setLastViewedId(data.id);
    setItems(prevItems => prevItems.map(item => 
      item.id === data.id ? { ...item, viewed: true } : item
    ));
  }
  
  // Função auxiliar para renderizar os itens numa zona
  const renderDraggableItems = (currentTier: TierLevel | 'pool') => {
    return items
      .filter((item) => item.tier === currentTier)
      .map((item: TierItem, index: number) => {
        const clipPlatform = Lib.getClipPlatform(item);
        const isDragging = draggedItem === item.id;
        
        return (
          <OverlayTrigger key={index} overlay={
            <Tooltip>
            <span className={"m-0 p-0 d-block text-small font-inter line-clamp-2 text-balance"}>
              {item.title || "Arraste para a lista ou clique para abrir o clipe."}
            </span>
            </Tooltip>
          }>
            <div
              id={`draggable-element-${item.id}`}
              className={`draggable-element p-2 rounded-0 m-1 overflow-x-auto bg-${item.color ?? Lib.getBSColor(parseInt(item.id))} ${item.className}`}
              style={{
                border: "1px solid #00000025",
                opacity: isDragging ? 0.5 : 1,
                position: isDragging && touchPosition ? 'fixed' : 'relative',
                left: isDragging && touchPosition ? touchPosition.x - 50 : 'auto', // Center roughly
                top: isDragging && touchPosition ? touchPosition.y - 50 : 'auto',
                zIndex: isDragging ? 1000 : 'auto',
                pointerEvents: isDragging ? 'none' : 'auto', // Important for elementFromPoint to work on underlying elements
                width: isDragging ? '150px' : 'auto', // Fixed width while dragging
                touchAction: 'none' // Prevent browser handling of gestures
              }}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onTouchStart={(e) => handleTouchStart(e, item.id)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => !isDragging && showClip(item)}
            >
              <div className={"pointer-events-none disabled d-flex flex-column justify-content-between h-100"}>
                <div>
                  <h3 className={"fw-medium fs-base text-balance lh-sm mb-1 p-0 line-clamp-2"}>
                    {item.title}
                  </h3>
                  
                  {
                    item.tier === "pool" && (
                      <div className={"d-flex flex-wrap align-items-start gap-1"}>
                        {lastViewedId === item.id && (
                          <Badge className={"border-0"} pill={true} bg={"primary"}>
                            <span className={"text-small fw-normal text-lowercase text-body-secondary"}>Visto por último</span>
                          </Badge>
                        )}
                        
                        {item.viewed && (
                          <Badge className={"border-0"} pill={true} bg={"success"}>
                            <span className={"text-small fw-normal text-lowercase text-body-secondary"}>Visualizado</span>
                          </Badge>
                        )}
                      </div>
                    )
                  }
                </div>
                
                <div>
                  <span
                    className={"text-small text-body-tertiary text-lowercase bg-transparent p-0 m-0 fw-normal w-auto d-block"}
                    style={{textAlign: "left"}}
                  >
                    clipado por
                  </span>
                  <p className={"m-0 p-0 d-flex gap-1 flex-wrap align-items-center"}>
                    <span className={"text-small text-body-secondary text-lowercase bg-transparent p-0 m-0 fw-normal w-auto"}>
                      {item.author ?? <VoidUser/>}
                    </span>
                    <span className={"text-small text-body-tertiary text-lowercase bg-transparent p-0 m-0 fw-normal w-auto"}>
                      from
                    </span>
                    <span className={"text-small text-body-secondary text-capitalize bg-transparent p-0 m-0 fw-normal w-auto"}>
                      <Image
                        src={clipPlatform === "twitch" ? TwitchLogo : KickLogo}
                        alt={"Logo da " + clipPlatform}
                        width={clipPlatform === "twitch" ? 20 : 50}
                        height={clipPlatform === "twitch" ? 20 : 25}
                      />
                    </span>
                  </p>
                </div>
              </div>
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
    setShowModal,
    
    // Confirmation/Alert Modal
    showConfirmModal,
    confirmMessage,
    requestConfirm,
    requestAlert,
    handleConfirm,
    handleCloseConfirm,
    dialogType
  }
}

export {
  initialItems,
  tiers
};

export type {
  TierLevel,
  ClipData
};