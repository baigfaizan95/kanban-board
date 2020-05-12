import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

interface IDragger {
  draggableId: string;
  index: number;
  children(
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ): React.ReactNode;
}
const Dragger = ({ draggableId, index, children }: IDragger) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => <>{children(provided, snapshot)}</>}
    </Draggable>
  );
};

export default Dragger;
