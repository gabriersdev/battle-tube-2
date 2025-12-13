import React, {createContext, RefObject} from "react";
import PropTypes from "prop-types";
import {TierLevel, TierItem} from "@/components/use-tier-list";

interface InitialContextValueProps {
  items: TierItem[];
  setItems: React.Dispatch<React.SetStateAction<TierItem[]>>;
  sectionRef: RefObject<HTMLDivElement | null>;
  activeDropZone: string | null;
  setActiveDropZone: React.Dispatch<React.SetStateAction<string | null>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleShow: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>, zoneId: string) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, targetTier: TierLevel | 'pool') => void;
  renderDraggableItems: (currentTier: TierLevel | 'pool') => React.ReactNode;
  saveToLocalStorage: (items: TierItem[]) => void;
  loadFromLocalStorage: () => TierItem[];
  resetTierList: () => void;
}

const InitialContextValue: InitialContextValueProps = {
  items: [],
  setItems: () => {},
  sectionRef: { current: null },
  activeDropZone: null,
  setActiveDropZone: () => {},
  show: false,
  setShow: () => {},
  handleClose: () => {},
  handleShow: () => {},
  handleDragStart: () => {},
  handleDragOver: () => {},
  handleDragLeave: () => {},
  handleDrop: () => {},
  renderDraggableItems: () => null,
  saveToLocalStorage: () => {},
  loadFromLocalStorage: () => [],
  resetTierList: () => {},
}

const Theme = createContext(InitialContextValue);

function ThemeContext({value, children}: { value?: InitialContextValueProps, children?: React.ReactNode }) {
  return (
    <Theme.Provider value={value ?? InitialContextValue}>
      {children}
    </Theme.Provider>
  );
}

ThemeContext.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node
}

export {Theme, ThemeContext};
