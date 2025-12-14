import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface ButtonCloseDialogProps {
  onClose: () => void;
}

const ButtonCloseDialog = ({ onClose }: ButtonCloseDialogProps) => {
  return (
    <Button variant="secondary" onClick={onClose} className={"text-small"}>
      Fechar
    </Button>
  );
};

interface DialogProps {
  children: ReactNode;
  show: boolean;
  onHide: () => void;
}

const Dialog = ({ children, show, onHide }: DialogProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="modal-dialog-analytics"
    >
      <Modal.Header className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <Modal.Title className="text-break fs-3">
          Estatísticas de Clipes do Canal
        </Modal.Title>
        <ButtonCloseDialog onClose={onHide} />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-between align-items-stretch gap-4">
        {children}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <ButtonCloseDialog onClose={onHide} />
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
