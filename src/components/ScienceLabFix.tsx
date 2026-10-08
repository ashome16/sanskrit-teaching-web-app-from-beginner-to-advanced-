// This helper will hook into your primary laboratory loop
import React from 'react';
import { SixPadarthas } from './SixPadarthas';

export const ScienceLabFix: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <SixPadarthas />
    </div>
  );
};
