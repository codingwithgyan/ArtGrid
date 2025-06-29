import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Live from './Live';
import { initializeFabric, handleCanvasMouseDown, handleResize, handleCanvaseMouseMove, handleCanvasMouseUp, renderCanvas, handleCanvasObjectModified, handlePathCreated, handleCanvasZoom, handleCanvasObjectScaling, handleCanvasSelectionCreated, handleCanvasObjectMoving } from './lib/canvas';
import { useMutation, useRedo, useStorage, useUndo } from '@liveblocks/react';
import { LiveMap } from '@liveblocks/client';
import { handleDelete, handleKeyDown } from './lib/key-events';
import { defaultNavElement } from './lib/constants';
import LeftSidebar from './components/sidebars/LeftSidebar';

function App() {
  const [activeElement, setActiveElement] = useState({
    name: '',
    value: '',
    icon: '',
  });
   const [elementAttributes, setElementAttributes] = useState({
    width: "",
    height: "",
    fontFamily: "",
    fontWeight: "",
    fontSize: "",
    stroke: "#aabbcc",
    fill: "#aabbcc",
  });
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef(null);
  const isEditingRef = useRef(false);
  const selectedShapeRef = useRef(null);
  const activeObjectRef = useRef(null);
  const undo = useUndo();
  const redo = useRedo();
  
  const canvasObjects = useStorage((root)=>root.canvasObject);
  console.log("===============canvasObjects",canvasObjects)
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
        fabricRef.current?.clear()
        setActiveElement(defaultNavElement)
        break;
      case "delete":
        handleDelete(fabricRef.current, deleteShapeFromStorage)
        break;  
      default:
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
    });

    canvas.on("path:created", (options) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    });

    canvas?.on("object:moving", (options) => {
      handleCanvasObjectMoving({
        options,
      });
    });

    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });

    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    });

    canvas.on("mouse:wheel", (options) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    });

    window.addEventListener("resize",()=>{
      handleResize({fabricRef})
    })

    window.addEventListener("keydown",(event)=>{
      handleKeyDown({
        e: event,
        canvas: fabricRef?.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
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
      <LeftSidebar allShapes={canvasObjects ? Array?.from(canvasObjects) : []}/>
      <Live canvasRef={canvasRef}/>
    </main>
  )
}

export default App
