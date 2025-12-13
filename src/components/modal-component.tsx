import {Button, Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";
import React, {useState} from "react";

export function ModalComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} size={"xl"}>
        <ModalHeader closeButton className={"align-items-start"}>
          <ModalTitle>
            <span className={"fs-3"}>Nome do clipe</span>
            <span className={"d-block text fw-normal text-body-secondary"}>Nome do clipper</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody className={"min-vh-80 overflow-y-scroll overflow-x-scroll"}>
          <iframe src={"https://clips.twitch.tv/embed?clip=MushyGracefulGnatMikeHogu-eKiiW0V1Q31YIIOI&parent=" + (process.env.NEXT_PUBLIC_PARENT_SITE)} allowFullScreen={true} height="100%" width="100%" style={{minHeight: "calc(80vh - 2rem)"}}></iframe>
        </ModalBody>
      </Modal>
    </>
  )
}
