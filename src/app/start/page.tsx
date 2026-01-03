'use client';

import React from 'react';
import { PresentationProvider } from './components/PresentationProvider';
import { PresentationStage } from './components/PresentationStage';

export default function StartPage() {
  return (
    <PresentationProvider>
      <PresentationStage />
    </PresentationProvider>
  );
}
