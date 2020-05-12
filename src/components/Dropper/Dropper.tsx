import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
  ResponderProvided,
  DragStart,
  DragUpdate,
} from 'react-beautiful-dnd';

interface IDropper {
  onDragEnd(result: DropResult, provided: ResponderProvided): void;
  onDragStart?(initial: DragStart, provided: ResponderProvided): void;
  onDragUpdate?(initial: DragUpdate, provided: ResponderProvided): void;
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
  onDragStart,
  onDragUpdate,
}: IDropper) => {
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      <Droppable direction={direction} droppableId={droppableId}>
        {(provided, snapshot) => <>{children(provided, snapshot)}</>}
      </Droppable>
    </DragDropContext>
  );
};

export default Dropper;
