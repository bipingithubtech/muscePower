import React from "react";
import { useDroppable } from "@dnd-kit/core";
const Dragbox = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "drop-area",
  });
  const style = {
    border: "2px dashed #ccc",
    padding: "20px",
    backgroundColor: isOver ? "#f0f8ff" : "#fff",
    transition: "background-color 0.3s ease",
  };

  return (
    <div className="droppable" ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Dragbox;
