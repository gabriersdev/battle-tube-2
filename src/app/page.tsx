"use client";

import React from 'react';
import {Button} from "react-bootstrap";
import Link from "next/link";
import Footer from "@/components/footer";
import LinkButton from "@/components/link-button";

export default function Home() {
  return (
    <>
      <main className={"container my-5 d-flex flex-column gap-5 min-h-screen"}>
        <hgroup className={"text-center mx-auto d-flex flex-column gap-3"}>
          <h1 className={"text-balance font-inter-tight fw-semibold display-5 text-info-emphasis"}>
            Oi! Este projeto é a tier list dos melhores clipes da live em 2025
          </h1>
          <div>
            <p className={"fs-2 max-w-800 mx-auto text-balance lh-sm font-inter-tight fw-medium mb-4"}>
              Você pode começar vendo os dados e estatísticas dos clipes no ano ou ir direto para a tier list.
            </p>
            <div className={"d-flex flex-wrap gap-3 w-full align-items-center justify-content-center"}>
              <LinkButton href={"/wrapped"} btnVariant={"primary"}>
                <span className={"fs-base"}>
                  Conferir o wrapped
                </span>
              </LinkButton>
              
              <LinkButton href={"/tier-list"} btnVariant={"warning"}>
                <span className={"fs-base"}>
                  Ir direto para a tier list
                </span>
              </LinkButton>
            </div>
          </div>
        </hgroup>
      </main>
      <div>
        <Footer variant={"wrapped"}/>
      </div>
    </>
  );
}
