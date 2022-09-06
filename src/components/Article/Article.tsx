import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Article as ArticleEntity } from '../../store/articles/slice';
import { Draggable } from 'react-beautiful-dnd';

interface IArticle {
  article: ArticleEntity;
  index: number;
}

const getArticleDraggableId = (url: string) => `lets-test-article-${url}`;

export const Article: React.FC<IArticle> = ({
  article: { title, author, content, url },
  index,
}) => {
  return (
    <Draggable draggableId={getArticleDraggableId(url)} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
          <Typography variant="body2">Published by: {author}</Typography>
        </Paper>
      )}
    </Draggable>
  );
};
