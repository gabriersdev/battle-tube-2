import React, {DragEvent, useRef, useState, useEffect} from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import clipsData from "@/resources/data.json";
import Lib from "@/utils/lib";
import Image from "next/image";

import TwitchLogo from "@/public/twitch.jpg";
import KickLogo from "@/public/kick.svg";

type TierLevel = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

interface TierItem {
  id: string;
  tier: TierLevel | 'pool';
  
  title: string;
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
  const [items, setItems] = useState<TierItem[]>(initialItems);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Erro ao carregar tier list do localStorage:', error);
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
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [dialogType, setDialogType] = useState<'confirm' | 'alert'>('confirm');

  const requestConfirm = (message: string, action: () => void) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setDialogType('confirm');
    setShowConfirmModal(true);
  };

  const requestAlert = (message: string) => {
    setConfirmMessage(message);
    setConfirmAction(() => {});
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
      .toSorted((a, b) => a.title.localeCompare(b.title))
      .map((item: TierItem, index: number) => {
        const clipPlatform = Lib.getClipPlatform(item);
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
              className={`draggable-element p-2 rounded-0 m-1 overflow-x-scroll bg-${Lib.getBSColor(index)} ${item.className}`}
              style={{border: "1px solid #00000025"}}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onClick={() => showClip(item)}
            >
              <div className={"pointer-events-none disabled d-flex flex-column justify-content-between h-100"}>
                <h3 className={"fw-medium fs-base text-balance lh-sm mb-1 p-0 line-clamp-2"}>
                  {item.title}
                </h3>
                <div>
                  <span
                    className={"text-small text-body-tertiary text-lowercase bg-transparent p-0 m-0 fw-normal w-auto d-block"}
                    style={{textAlign: "left"}}
                  >
                    clipado por
                  </span>
                  <p className={"m-0 p-0 d-flex gap-1 flex-wrap align-items-center"}>
                    <span className={"text-small text-body-secondary text-lowercase bg-transparent p-0 m-0 fw-normal w-auto"}>
                      {item.author ?? (
                        <OverlayTrigger
                          overlay={
                            <Tooltip>
                            <span className={"text-small"}>
                              Não foi possível obter o username do criador do clipe
                            </span>
                            </Tooltip>
                          }>
                          <span
                            className={"bg-transparent text-lowercase p-0 m-0 text-body-secondary fw-normal"}
                            style={{fontSize: "inherit", width: "auto"}}
                          >
                            void user
                          </span>
                        </OverlayTrigger>
                      )}
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
  TierItem,
  ClipData
};
