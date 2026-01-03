'use client';

import React from 'react';
import { PresentationProvider } from '../../components/presentation-provider';
import { PresentationStage } from '../../components/presentation-stage';

export default function StartPage() {
  return (
    <PresentationProvider>
      <PresentationStage />
    </PresentationProvider>
  );
}
