import { Rect, Circle, Triangle, Line, IText, Image, Path  } from 'fabric';
import { v4 as uuidv4 } from "uuid";

export const createFreeform = (pathData, options = {}) => {
  return new Path(pathData, {
    fill: null,
    stroke: "#aabbcc",
    strokeWidth: 2,
    objectId: uuidv4(),
    ...options
  });
};

export const createTriangle = pointer => {
  return new Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4()
  })
}

export const createRectangle = pointer => {
  const rect = new Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4()
  })

  return rect
}

export const createLine = pointer => {
  return new Line(
    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100],
    {
      stroke: "#aabbcc",
      strokeWidth: 2,
      objectId: uuidv4()
    }
  )
}

export const createCircle = pointer => {
  return new Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#aabbcc",
    objectId: uuidv4()
  })
}



export const createText = (pointer, text) => {
  return new IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4()
  })
}

export const createSpecificShape = (shapeType, pointer) => {
  switch (shapeType) {
    case "circle":
      return createCircle(pointer)

    case "line":
      return createLine(pointer)

    case "rectangle":
      return createRectangle(pointer)

    case "triangle":
      return createTriangle(pointer)

    case "text":
      return createText(pointer, "Tap to Type")

    default:
      return null
  }
}

export const handleImageUpload = ({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage
}) => {
  const reader = new FileReader()

  reader.onload = () => {
    Image.fromURL(reader.result, img => {
      img.scaleToWidth(200)
      img.scaleToHeight(200)

      canvas.current.add(img)

      img.objectId = uuidv4()

      shapeRef.current = img

      syncShapeInStorage(img)
      canvas.current.requestRenderAll()
    })
  }

  reader.readAsDataURL(file)
}

export const createShape = (canvas, pointer, shapeType) => {
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true
    return null
  }

  return createSpecificShape(shapeType, pointer)
}

export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage
}) => {
  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === "activeSelection") return

  if (property === "width") {
    selectedElement.set("scaleX", 1)
    selectedElement.set("width", value)
  } else if (property === "height") {
    selectedElement.set("scaleY", 1)
    selectedElement.set("height", value)
  } else {
    if (selectedElement[property] === value) return
    selectedElement.set(property, value)
  }

  activeObjectRef.current = selectedElement

  syncShapeInStorage(selectedElement)
}

export const bringElement = ({ canvas, direction, syncShapeInStorage }) => {
  if (!canvas) return

  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === "activeSelection") return

  if (direction === "front") {
    canvas.bringToFront(selectedElement)
  } else if (direction === "back") {
    canvas.sendToBack(selectedElement)
  }

  syncShapeInStorage(selectedElement)

}
