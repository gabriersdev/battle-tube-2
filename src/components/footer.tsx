import moment from "moment";
import Link from "next/link";
import {Button} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";

import {Theme} from "@/components/tier-list-context";
import buildData from "../../public/register.build.json";
import {githubDev, relExternalLink} from "@/resources/config";

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
          
          <Link href={process.env.NEXT_PUBLIC_GITHUB_CREATE_ISSUE ?? "#0"}>
            <Button variant={"secondary"} className={"fs-base"}>
              Informar um erro
            </Button>
          </Link>
          
          <Link href={process.env.NEXT_PUBLIC_GITHUB_CLONE_URL ?? "#0"}>
            <Button variant={"secondary"} className={"fs-base"}>
              Fazer minha própria tier list
            </Button>
          </Link>
          
          <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "#0"}>
            <Button variant={"secondary"} className={"fs-base"}>
              Repositório no Github
            </Button>
          </Link>
          
          {
            variant === "wrapped" ? (
              <Link href={"/tier-list"}>
                <Button variant={"secondary"} className={"fs-base"}>
                  Ir para a tier list
                </Button>
              </Link>
            ) : (
              <Link href={"/wrapped"}>
                <Button variant={"secondary"} className={"fs-base"}>
                  Ver wrapped
                </Button>
              </Link>
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
              <p className={"fs-base mb-0 d-inline-flex gap-2"}>
                <span>Feito com 💖 pelo</span>
                <Link href={githubDev} target={relExternalLink} className={'text-decoration-none fw-normal'}>Gabriel</Link>
              </p>
              <span className={"text-small text-body-secondary"}>Versão de build: {moment(buildData.datetimeCreate ?? "2026-01-01T00:00:00").format("DD[.]MM[.]YYYY HH:mm")} GMT-03:00</span>
            </div>
          </div>
        )
      }
    </footer>
  )
}