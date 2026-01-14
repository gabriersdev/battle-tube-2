import Link from "next/link";
import Lib from "@/utils/lib";
import Image from "next/image";
import React, {useContext, useEffect} from "react";
import {Theme} from "@/components/tier-list-context";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, ModalTitle, OverlayTrigger, Tooltip} from "react-bootstrap";

import {Dropdown} from "react-bootstrap";
import Iframe from "@/components/iframe";
import VoidUser from "@/components/void-user";
import {targetExternalLink} from "@/resources/config";
import {TierLevel, tiers} from "@/components/use-tier-list";

import KickLogo from "../../public/kick.svg";
import TwitchLogo from "../../public/twitch.jpg";

export function ModalComponent() {
  const {
    showClipData,
    setShowClipData,
    showModal,
    setShowModal,
    items,
    setItems,
  } = useContext(Theme);
  
  const handleClose = () => setShowModal(false);
  
  const handleTierSelect = (tier: string) => {
    if (!showClipData) return;
    
    setItems((prev) => prev.map((item) => {
      if (item.id === showClipData.id) {
        return {
          ...item,
          tier: tier as never
        }
      }
      return item;
    }));
  };
  
  const currentItem = showClipData ? items.find(i => i.id === showClipData.id) : null;
  const currentTier: TierLevel | "pool" = currentItem?.tier ?? "pool";
  
  const platform = showClipData ? Lib.getClipOrigin(showClipData) : "";
  const clipId = showClipData ? Lib.getClipID(showClipData) : "";
  
  useEffect(() => {
    if (platform === "kick" && showClipData?.url) setTimeout(() => {
      window.open(showClipData.url, "_blank", "noreferrer noopener");
    }, 500);
  }, [platform, showClipData]);
  
  const handlePrevious = () => {
    if (!showClipData) return;
    const currentIndex = items.findIndex(i => i.id === showClipData.id);
    if (currentIndex > 0) {
      setShowClipData(items[currentIndex - 1]);
    } else {
      setShowClipData(items[items.length - 1]);
    }
  };
  
  const handleNext = () => {
    if (!showClipData) return;
    const currentIndex = items.findIndex(i => i.id === showClipData.id);
    if (currentIndex < items.length - 1) {
      setShowClipData(items[currentIndex + 1]);
    } else {
      setShowClipData(items[0]);
    }
  };
  
  return (
    <>
      <Modal show={showModal} onHide={handleClose} size={"xl"}>
        <ModalHeader closeButton className={"align-items-start"}>
          <ModalTitle className={"d-flex align-items-center justify-content-between flex-wrap gap-3 pe-2 w-100"}>
            <Link href={showClipData?.url ?? ""} target={targetExternalLink} className={"text-decoration-none"}>
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
                {showClipData?.author ?? <VoidUser/>}
              </span>
            </Link>
            
            <div className="d-flex gap-2 align-items-center">
              <Dropdown>
                <div
                  className={`tier-list ${currentTier !== "pool" ? currentTier.toLowerCase() : "bg-primary text-body"} rounded-1`}
                  style={{width: "auto", maxWidth: "100vh", display: "inline-block", padding: 0}}
                >
                  <DropdownToggle
                    variant="outline-success"
                    style={{background: "transparent", paddingTop: "0.35rem", paddingBottom: "0.35rem"}}
                    id="dropdown-classified-clip"
                    className={"text d-inline-flex align-items-center gap-1 flex-wrap"}
                    size={"sm"}
                  >
                    {
                      currentTier === "pool" ? (
                        <>
                          <i className={"text-small text-body fst-normal"}>Classificar como</i>
                        </>
                      ) : (
                        <>
                          <i className={"text-small text-white fst-normal"}>Classificado como </i>
                          <b className={"text-small text-white"}>{currentTier}</b>
                        </>
                      )
                    }
                  </DropdownToggle>
                </div>
                
                <DropdownMenu className={"text"}>
                  {
                    [...tiers, "pool"]?.map((tier, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() => handleTierSelect(tier)}
                        className={`tier-list ${tier === "pool" ? "bg-primary text-body" : `${tier.toLowerCase()} text-white`} d-flex align-items-center gap-1 flex-wrap text-capitalize`}
                      >
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
                        
                        {tier === "pool" ? "Sem class." : tier}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
          </ModalTitle>
        </ModalHeader>
        
        <ModalBody className={"min-vh-80 overflow-y-scroll overflow-x-auto position-relative"}>
          {platform === "twitch" && clipId ? (
            <Iframe id={clipId} allowFullScreen={true} width="100%" height="100%" style={{minHeight: "calc(80vh - 2rem)"}} ignoreResponsiveWidth={true}/>
          ) : (
            <div style={{minHeight: "calc(80vh - 2rem)", background: "#0c0c0c"}} className={"d-flex justify-content-center align-items-center"}>
              <div className={"d-flex align-items-center justify-content-center flex-wrap gap-3 text-white flex-column"}>
                <h2 style={{maxWidth: "600px"}}>
                  <span className={"text-balance d-block mx-auto text-center"}>
                    Iframe não suportado. Veja este clipe na KICK!
                  </span>
                </h2>
                <Button className={"text d-inline-flex align-items-center justify-content-center flex-wrap gap-1"} href={showClipData?.url} target={targetExternalLink}>
                  Assistir na KICK{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#1f1f1f">
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                  </svg>
                </Button>
              </div>
            </div>
          )}
          
          <div
            className={'d-flex align-items-center flex-wrap gap-2 position-absolute'}
            style={{bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)'}}
          >
            <Button variant="outline-secondary" size="sm" onClick={handlePrevious}>
              {/*<span className={'text-small'}>Clipe anterior</span>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={handleNext}>
              {/*<span className={'text-small'}>Próximo clipe</span>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
