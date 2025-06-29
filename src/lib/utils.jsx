export const getShapeInfo = (type) => {
  switch (type) {
    case "Rect":
      return {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
      };

    case "Circle":
      return {
        icon: "/assets/circle.svg",
        name: "Circle",
      };

    case "Triangle":
      return {
        icon: "/assets/triangle.svg",
        name: "Triangle",
      };

    case "Line":
      return {
        icon: "/assets/line.svg",
        name: "Line",
      };

    case "IText":
      return {
        icon: "/assets/text.svg",
        name: "Text",
      };

    case "Image":
      return {
        icon: "/assets/image.svg",
        name: "Image",
      };

    case "Path":
      return {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
      };

    default:
      return {
        icon: "/assets/rectangle.svg",
        name: type,
      };
  }
};
