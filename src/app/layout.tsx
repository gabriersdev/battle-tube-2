import React from "react";
import type {Metadata} from "next";
import {Inter, Inter_Tight, Radio_Canada_Big, JetBrains_Mono} from "next/font/google";

import '@/style/bootstrap.min.css';
import '@/style/style.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const radioCanadaBig = Radio_Canada_Big({
  variable: "--font-radio-canada",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melhores clipes de 2025 - Eskimozin",
  description: "Explore uma coleção de momentos épicos, risadas e jogadas impressionantes diretamente do mundo da Twitch e Kick. Se você é fã de games, streaming e aquela dose de adrenalina ao vivo, este é o lugar perfeito! Navegue pelos clipes mais legais e reviva os melhores instantes das transmissões - tudo com a conveniência de um simples clique. Pronto para se divertir? O próximo grande clipe está a apenas um play de distância!",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-bs-theme={"normal"}>
    <body
      className={`${inter.variable} ${mono.variable} ${interTight.variable} ${radioCanadaBig.variable}`}
      style={{userSelect: "text"}}
    >
    {children}
    </body>
    </html>
  );
}
