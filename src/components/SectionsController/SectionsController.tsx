import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Section } from '../Section/Section';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Article } from '../Article/Article';
import { Article as IArticle } from '../../store/articles/slice';

interface ISectionsController {}

const ALL_ARTICLES_SECTION_TITLE = 'All Articles';

export const SectionsController: React.FC<ISectionsController> = () => {
  const { articles } = useSelector((state: RootState) => state.articles);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [sections, setSections] = useState<Map<string, IArticle[]>>(() => {
    const sectionsMap = new Map();
    sectionsMap.set(ALL_ARTICLES_SECTION_TITLE, []);

    return sectionsMap;
  });

  useEffect(() => {
    setSections((currentSections) => {
      currentSections.set(ALL_ARTICLES_SECTION_TITLE, articles);

      return new Map(currentSections);
    });
  }, [articles]);

  const renderSections = () => {
    const sectionsObject = Object.fromEntries(sections);

    return Object.entries(sectionsObject).map(
      ([sectionTitle, sectionArticles]) => {
        return (
          <Section title={sectionTitle}>
            {sectionArticles.map((article, index) => {
              return <Article article={article} index={index} />;
            })}
          </Section>
        );
      },
    );
  };

  const addSection = () => {
    setSections((currentSections) => {
      currentSections.set(newSectionTitle, []);

      return new Map(currentSections);
    });
  };

  return (
    <Box>
      <Box>
        <TextField
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addSection();
            }
          }}
        />
      </Box>
      <Box display="flex" flexWrap="nowrap">
        {renderSections()}
      </Box>
    </Box>
  );
};
