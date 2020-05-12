import React, { CSSProperties } from 'react';
import { IItem } from 'interfaces/IItem';
import Dragger from 'components/Dragger';
import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

const Item = (props: IItem & { index: number }) => {
  const getItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle
  ): CSSProperties => ({
    userSelect: 'none',
    ...draggableStyle,
  });

  return (
    <Dragger draggableId={`wrapper-item-${props.id}`} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(provided.draggableProps.style || {})}
        >
          {props.title}
        </div>
      )}
    </Dragger>
  );
};

export default Item;
