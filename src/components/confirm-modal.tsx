import React, {useContext} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {Theme} from "@/components/tier-list-context";

export function ConfirmModal() {
  const {
    showConfirmModal,
    confirmMessage,
    handleConfirm,
    handleCloseConfirm,
    dialogType
  } = useContext(Theme);

  return (
    <Modal show={showConfirmModal} onHide={handleCloseConfirm} centered>
      <ModalHeader closeButton>
        <ModalTitle>{dialogType === 'confirm' ? 'Confirmação' : 'Aviso'}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {confirmMessage}
      </ModalBody>
      <ModalFooter className={"d-flex justify-content-end gap-2 flex-wrap"}>
        {dialogType === 'confirm' && (
          <Button size={"sm"} variant="secondary" onClick={handleCloseConfirm}>
            <span className={"text-small"}>Cancelar</span>
          </Button>
        )}
        <Button size={"sm"} variant="primary" onClick={handleConfirm}>
          <span className={"text-small"}>{dialogType === 'confirm' ? 'Confirmar' : 'OK'}</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
}
