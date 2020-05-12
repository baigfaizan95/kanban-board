import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

interface IDropper {
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  droppableId: string;
  direction?: 'vertical' | 'horizontal';
  children(
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
  ): React.ReactNode;
}

const Dropper = ({
  onDragEnd,
  droppableId,
  direction = 'vertical',
  children,
}: IDropper) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction={direction} droppableId={droppableId}>
        {(provided, snapshot) => <>{children(provided, snapshot)}</>}
      </Droppable>
    </DragDropContext>
  );
};

export default Dropper;
