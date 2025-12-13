import React from "react";
import {UseTierList} from "@/components/use-tier-list";
import {ThemeContext} from "@/components/tier-list-context";
import Selection from "@/components/selection";

export default function TierList() {
  const {
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
    saveToLocalStorage,
    loadFromLocalStorage,
    resetTierList
  } = UseTierList();
  
  return (
    <ThemeContext value={{
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
      saveToLocalStorage,
      loadFromLocalStorage,
      resetTierList
    }}>
      <Selection/>
    </ThemeContext>
  )
}
