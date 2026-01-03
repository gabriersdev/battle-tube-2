"use client";

import React from 'react';
import TierList from "@/components/tier-list";
import StatisticsDialog from "@/components/new-adapter-code/statistics-dialog";

export default function TierListPage() {
  return (
    <main className={"container my-5 d-flex flex-column gap-5"}>
      <hgroup className={"text-center mx-auto"} style={{maxWidth: "600px"}}>
        <h1 className={"text-balance font-inter-tight fw-semibold"}>
          Tier List dos melhores clipes da live em 2025
        </h1>
      </hgroup>

      <TierList/>
      <StatisticsDialog/>
    </main>
  );
}
