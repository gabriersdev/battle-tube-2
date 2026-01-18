import moment from "moment";
import Link from "next/link";
import {Button} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {githubDev, relExternalLink, routes} from "@/resources/config";

import LinkButton from "@/components/link-button";
import {Theme} from "@/components/tier-list-context";
import buildData from "../../public/register.build.json";

moment.locale("pt-BR");

export default function Footer({variant}: { variant: "wrapped" | "tier-list" }) {
  const [ls, setLS] = useState<boolean>(false);
  const {requestConfirm} = useContext(Theme);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.localStorage) setLS(!!window.localStorage);
    else setLS(false);
  }, []);
  
  return (
    <footer className={"d-flex flex-column gap-5"}>
      <div className={'container'}>
        {
          variant === "tier-list" && (
            <p className={"m-0 text-center text-body-secondary text-balance"}>
              {ls && "Não se preocupe, conforme você interage com a tier list o progresso é salvo no navegador. "}
              Ao usar a tier list, você concorda com o armazenamento de alguns dados no navegador para aprimorar sua experiência, realizar análises de performance, corrigir erros e identificar bugs.
            </p>
          )
        }
      </div>
      
      <div className={'container'}>
        <div className={"d-flex gap-2 flex-wrap align-items-center justify-content-center"}>
          <Button variant={"primary"} className={"fs-base"} onClick={() => {
            requestConfirm('Tem certeza? Tudo será perdido.', () => {
              if (localStorage) localStorage.clear();
              if (sessionStorage) sessionStorage.clear();
              window.location.reload();
            });
          }}>
            Limpar dados salvos no navegador
          </Button>
          
          <LinkButton href={process.env.NEXT_PUBLIC_GITHUB_CREATE_ISSUE ?? "#0"} btnVariant={"secondary"} btnClassName={"fs-base"}>
            Informar um erro
          </LinkButton>
          
          <LinkButton href={process.env.NEXT_PUBLIC_GITHUB_CLONE_URL ?? "#0"} btnVariant={"secondary"} btnClassName={"fs-base"}>
            Fazer minha própria tier list
          </LinkButton>
          
          <LinkButton href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "#0"} btnVariant={"secondary"} btnClassName={"fs-base"}>
            Repositório no Github
          </LinkButton>
          
          {
            variant === "wrapped" && routes["/tier-list"] && (
              <LinkButton href={"/tier-list"} btnVariant={"secondary"} btnClassName={"fs-base"}>
                Ir para a tier list
              </LinkButton>
            )
          }
          
          {
            variant === "tier-list" && routes["/wrapped"] && (
              <LinkButton href={"/wrapped"} btnVariant={"secondary"} btnClassName={"fs-base"}>
                Ver wrapped
              </LinkButton>
            )
          }
        </div>
      </div>
      
      {
        variant === "wrapped" && (
          <div style={{borderTop: "2.5px solid #000"}}>
            <div className={'container d-flex align-items-center justify-content-center p-3 gap-2 flex-column'}>
              <Link href={"/"} className={'text-decoration-none fw-normal'}>
                <span className={"text-small text-body-secondary"}>Battle Tube 2025</span>
              </Link>
              <p className={"fs-base mb-0 d-inline-flex"}>
                <span className={"text-nowrap"}>
                  Feito com 💖 pelo <Link href={githubDev} target={relExternalLink} className={'text-decoration-none fw-normal'}>Gabriel</Link> <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className={"mb-1"} fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"></path></svg>
                </span>
              </p>
              <span className={"text-small text-body-secondary"}>Versão de build: {moment(buildData.datetimeCreate ?? "2026-01-01T00:00:00").format("DD[.]MM[.]YYYY HH:mm")} GMT-03:00</span>
            </div>
          </div>
        )
      }
    </footer>
  )
}