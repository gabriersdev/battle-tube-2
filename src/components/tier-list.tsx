import React from "react";
import {UseTierList} from "@/components/use-tier-list";
import {ThemeContext} from "@/components/tier-list-context";
import Selection from "@/components/selection";
import {ModalComponent} from "@/components/modal-component";
import {ConfirmModal} from "@/components/confirm-modal";
import Footer from "@/components/footer";

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
    resetTierList,
    showClipData,
    showModal,
    setShowModal,
    tiers,
    showConfirmModal,
    confirmMessage,
    requestConfirm,
    requestAlert,
    handleConfirm,
    handleCloseConfirm,
    dialogType
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
      resetTierList,
      showClipData,
      showModal,
      setShowModal,
      tiers,
      showConfirmModal,
      confirmMessage,
      requestConfirm,
      requestAlert,
      handleConfirm,
      handleCloseConfirm,
      dialogType
    }}>
      <Selection/>
      <Footer variant={"tier-list"}/>
      <ModalComponent/>
      <ConfirmModal/>
    </ThemeContext>
  )
}
