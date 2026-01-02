import {Button, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, ModalTitle, OverlayTrigger, Tooltip} from "react-bootstrap";
import React, {useContext, useEffect} from "react";
import {Theme} from "@/components/tier-list-context";
import Image from "next/image";

import KickLogo from "@/public/kick.svg";
import TwitchLogo from "@/public/twitch.jpg";
import {Dropdown} from "@restart/ui";
import {tiers} from "@/components/use-tier-list";
import Lib from "@/utils/lib";
import Iframe from "@/components/iframe";
import Link from "next/link";

export function ModalComponent() {
  const {
    showClipData,
    showModal,
    setShowModal,
    items,
    setItems,
  } = useContext(Theme);
  
  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);
  
  useEffect(() => {
    console.log("handle!")
    console.log(showClipData);
  }, [showClipData]);
  
  const handleTierSelect = (tier: string) => {
    if (!showClipData) return;
    
    setItems((prev) => prev.map((item) => {
      if (item.id === showClipData.id) {
        return {
          ...item,
          tier: tier as any
        }
      }
      return item;
    }));
  };

  const currentItem = showClipData ? items.find(i => i.id === showClipData.id) : null;
  const currentTier = currentItem?.tier;
  
  const platform = showClipData ? Lib.getClipOrigin(showClipData) : "";
  const clipId = showClipData ? Lib.getClipID(showClipData) : "";
  
  return (
    <>
      <Modal show={showModal} onHide={handleClose} size={"xl"}>
        <ModalHeader closeButton className={"align-items-start"}>
          <ModalTitle className={"d-flex align-items-center justify-content-between flex-wrap gap-3 pe-2 w-100"}>
            <Link href={showClipData?.url ?? ""} target={"_blank"} className={"text-decoration-none"}>
              <div className={"d-flex align-items-center gap-0"}>
                <span className={"fs-3 line-clamp-1"}>
                  {showClipData?.title ?? "Nome do clipe"}
                </span>
                <span>
                  {platform === "twitch" && <Image src={TwitchLogo} alt={"Logo da plataforma"} width={50} height={50} className={"object-fit-contain"} style={{maxHeight: "25px", maxWidth: "50px"}}/>}
                  {platform === "kick" && <Image src={KickLogo} alt={"Logo da plataforma"} width={50} height={50} className={"object-fit-contain ms-2"} style={{maxHeight: "25px", maxWidth: "50px"}}/>}
                </span>
              </div>
              <span className={"d-block text fw-normal text-body-secondary"}>
                {showClipData?.author ?? "Nome do clipper"}
              </span>
            </Link>
            
            <Dropdown>
              <DropdownToggle variant="success" id="dropdown-classified-clip" className={"text"} size={"sm"}>
                <span className={"text-small"}>Classificar como</span>
              </DropdownToggle>
              
              <DropdownMenu className={"text"}>
                {
                  tiers?.map((tier, index) => (
                    <DropdownItem onClick={() => handleTierSelect(tier)} key={index} className={`tier-list text-white ${tier.toLowerCase()} d-flex align-items-center gap-1 flex-wrap`}>
                      {tier}
                      {currentTier === tier && (
                        <OverlayTrigger overlay={
                          <Tooltip>
                            <span className={"font-inter text-small d-block text-balance line-clamp-2"}>O clipe está classificado como {"\""}{tier}{"\""}</span>
                          </Tooltip>
                        }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                          </svg>
                        </OverlayTrigger>
                      )}
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </Dropdown>
          </ModalTitle>
        </ModalHeader>
        
        <ModalBody className={"min-vh-80 overflow-y-scroll overflow-x-scroll"}>
          {platform === "twitch" && clipId ? (
            <Iframe id={clipId} allowFullScreen={true} width="100%" height="100%" style={{minHeight: "calc(80vh - 2rem)"}}/>
          ) : (
            <div style={{minHeight: "calc(80vh - 2rem)", background: "#0c0c0c"}} className={"d-flex justify-content-center align-items-center"}>
              <div className={"d-flex align-items-center justify-content-center flex-wrap gap-3 text-white flex-column"}>
                <h2 style={{maxWidth: "600px"}}>
                  <span className={"text-balance d-block mx-auto text-center"}>
                    Iframe não suportado. Veja este clipe na KICK!
                  </span>
                </h2>
                <Button className={"text d-inline-flex align-items-center justify-content-center flex-wrap gap-1"} href={showClipData?.url} target="_blank">
                  Assistir na KICK{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#1f1f1f">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
