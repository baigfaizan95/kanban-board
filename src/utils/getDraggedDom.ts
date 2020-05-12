const queryAttr = 'data-rbd-drag-handle-draggable-id';

const getDraggedDom = (draggableId: string) => {
  const domQuery = `[${queryAttr}='${draggableId}']`;
  const draggedDOM = document.querySelector(domQuery) as HTMLElement;
  return draggedDOM;
};

export default getDraggedDom;
