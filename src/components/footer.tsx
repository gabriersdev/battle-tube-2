import {Button} from "react-bootstrap";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function Footer() {
  const [ls, setLS] = useState<boolean>(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.localStorage) setLS(!!window.localStorage);
    else setLS(false);
  }, []);
  
  return (
    <footer className={"d-flex flex-column gap-5"}>
      <p className={"m-0 text-center text-body-secondary text-balance"}>
        {ls && "Não se preocupe, conforme você interage com a Tier List o progresso é salvo no navegador. "}
        Ao usar a Tier List, você concorda com o armazenamento de alguns dados no navegador para aprimorar sua experiência, realizar análises de performance, corrigir erros e identificar bugs.
      </p>
      
      <div className={"d-flex gap-2 flex-wrap align-items-center justify-content-center"}>
        <Button variant={"primary"} className={"fs-base"} onClick={() => {
          if (confirm('Tem certeza? Tudo será perdido.')) {
            if (localStorage) localStorage.clear();
            if (sessionStorage) sessionStorage.clear();
            window.location.reload();
          }
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
            Fazer minha própria Tier List
          </Button>
        </Link>
        
        <Link href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "#0"}>
          <Button variant={"secondary"} className={"fs-base"}>
            Repositório no Github
          </Button>
        </Link>
      </div>
    </footer>
  )
}