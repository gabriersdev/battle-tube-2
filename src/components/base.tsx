"use client";

import React, {useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";

export default function Base({children}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    try {
      // Verificar se #[id] existe e rolar a página até ele
      const hash = window.location.hash;
      const scrollToTop = () => {
        setTimeout(() => {
          window.scrollTo({top: 0, behavior: 'smooth'})
        }, 100);
      }
      
      if (hash && !pathname?.split("/")?.[1]?.match(/\d/)) {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) window.scrollTo({top: element.offsetTop, behavior: 'smooth'})
        else scrollToTop();
      } else scrollToTop();
    }
      //
    catch (error) {
      console.log('Ocorreu um erro ao tentar verificar os parâmetros passados. %s', error);
    }
  }, [pathname, searchParams])
  
  return <>{children}</>
}