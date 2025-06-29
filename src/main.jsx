import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import './index.css'
import App from './App.jsx'
import { LiveMap } from '@liveblocks/client';
"use client";


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <LiveblocksProvider publicApiKey={import.meta.env.VITE_LIVEBLOCK_PUBLIC_KEY}>
      <RoomProvider initialStorage={{canvasObject: new LiveMap()}} id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <App />
        </ClientSideSuspense>
        </RoomProvider>
    </LiveblocksProvider>
  </StrictMode>,
)
