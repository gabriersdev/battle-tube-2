import {Button, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import {Dropdown} from "@restart/ui";
import React from "react";

export default function Player() {
  return (
    <div className={"position-absolute px-2 py-2 rounded"} style={{bottom: "1rem", right: "1rem", border: "1px solid #00000025"}}>
      <div className={"m-0 p-0 d-flex flex-column gap-1"}>
        <span className={"text-small text-body-tertiary"}>Tocando agora</span>
        <span className={"text-small"}>Noite Fria, PT. II</span>
        <div className={"d-flex flex-wrap gap-1 mt-2"}>
          <Button size={"sm"} variant={"secondary"}>
            <span className={"text-small"}>Play | Pause</span>
          </Button>
          
          <Dropdown>
            <DropdownToggle className={"text-small py-1 px-3"}>Vol.</DropdownToggle>
            
            <DropdownMenu className={"text-small"}>
              <DropdownItem>
                Sem som
              </DropdownItem>
              {
                Array.from({length: 4}, (_, i) => i + 1).map((i) => {
                  return (
                    <DropdownItem key={i}>
                      {i * 25}
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16">
                        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                      </svg>
                    </DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}