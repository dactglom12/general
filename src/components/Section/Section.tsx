import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

export interface ISection {
  title: string;
}

const getSectionDroppableId = (title: string) => `lets-test-section-${title}`;

export const Section: React.FC<ISection> = ({ title, children }) => {
  return (
    <Droppable droppableId={getSectionDroppableId(title)}>
      {(provided) => (
        <Paper
          sx={{
            width: '300px',
            minHeight: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            borderRadius: '8px',
            boxSizing: 'border-box',
            padding: '8px',
            border: '1px solid aqua',
          }}
          elevation={4}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Stack>
            <Typography variant="body1">{title}</Typography>
            {children}
          </Stack>
        </Paper>
      )}
    </Droppable>
  );
};
