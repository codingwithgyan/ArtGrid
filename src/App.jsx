import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Live from './Live';
import { initializeFabric, handleCanvasMouseDown, handleResize, handleCanvaseMouseMove, handleCanvasMouseUp, renderCanvas, handleCanvasObjectModified } from './lib/canvas';
import { useMutation, useStorage } from '@liveblocks/react';
import { LiveMap } from '@liveblocks/client';
import { handleDelete } from './lib/key-events';
import { defaultNavElement } from './lib/constants';

function App() {
  const [activeElement, setActiveElement] = useState({
    name: '',
    value: '',
    icon: '',
  })
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef(null);
  const selectedShapeRef = useRef(null);
  const activeObjectRef = useRef(null);
  
  const canvasObjects = useStorage((root)=>root.canvasObject);

  // Sync objects
  const syncShapeInStorage = useMutation(({storage}, object) => {
    if(!object) 
      return;

    const {objectId} = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasStorage = storage.get("canvasObject");
    canvasStorage.set(objectId, shapeData)

  },[]);

 const deleteAllObjects = useMutation(({ storage }) => {
  const canvasStorage = storage.get("canvasObject");

  if (!canvasStorage || canvasStorage.size === 0) 
    return true;

  for (const [key] of canvasStorage.entries()) {
    canvasStorage.delete(key);
  }
  return canvasStorage.size === 0;
}, []);

  const deleteShapeFromStorage = useMutation(({storage},objectId)=>{
      if(!objectId) 
        return true;

      const canvasObject = storage.get("canvasObject");
      canvasObject.delete(objectId);
      return true;
  },[]) 

  const handleActiveElement = (elem) => {
    selectedShapeRef.current = elem.value;
    setActiveElement(elem);

    switch(elem?.value) {
      case "reset":
        deleteAllObjects();
        setActiveElement(defaultNavElement)
        break;
      case "delete":
        handleDelete(fabricRef.current, deleteShapeFromStorage)
        break;  
    }
  }

  //Sync and render All 
   useEffect(()=>{
      renderCanvas({fabricRef, canvasObjects, activeObjectRef})
  },[canvasObjects])
  
  useEffect(()=>{
    const canvas = initializeFabric({canvasRef, fabricRef})
    canvas.on("mouse:down",(options)=>{
      handleCanvasMouseDown({
        canvas,
        options,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      })
    });

     canvas.on("mouse:move",(options)=>{
      handleCanvaseMouseMove({
        canvas,
        options,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage,
      })
    });

    canvas.on("mouse:up",(options)=>{
      handleCanvasMouseUp({
        canvas,
        options,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage,
        activeElement,
        setActiveElement,
        activeObjectRef,
      })
    });

    canvas.on("object:modified",(options)=>{
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      })
    })

    window.addEventListener("resize",()=>{
      handleResize({fabricRef})
    })

    return () => {
    if (fabricRef.current) {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
    window.removeEventListener("resize", () => {
      handleResize({ fabricRef });
    });
  };
  },[]);

 

  return (
    <main className='app-main-container'>
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement}/>
      <Live canvasRef={canvasRef}/>
    </main>
  )
}

export default App
