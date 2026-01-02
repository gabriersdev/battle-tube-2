import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export default function VoidUser() {
  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <span className={"text-small font-inter"}>
            Não foi possível obter o username do criador do clipe
          </span>
        </Tooltip>
      }>
      <span
        className={"bg-transparent text-lowercase p-0 m-0 text-body-secondary fw-normal d-flex align-items-center justify-content-start gap-1"}
        style={{fontSize: "inherit", width: "auto"}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
        </svg>
        <span className={"bg-transparent p-0 m-0 lh-base fw-normal fs-base text-lowercase text-body-secondary"} style={{fontSize: "inherit", width: "auto"}}>
          void user
        </span>
      </span>
    </OverlayTrigger>
  );
}
