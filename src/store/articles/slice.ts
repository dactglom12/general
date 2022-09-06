import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticleSource {
  id: string;
  name: string;
}

export interface Article {
  title: string;
  content: string;
  author: string;
  description: string;
  publishedAt: string;
  source: ArticleSource;
  url: string;
  urlToImage: string;
}

interface ArticlesState {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  error: null,
};

const name = 'articles';

export const articlesSlice = createSlice({
  name,
  initialState,
  reducers: {
    getArticles: (state) => {
      state.isLoading = true;
    },
    getArticlesSuccess: (
      state,
      action: PayloadAction<{ articles: Article[] }>,
    ) => {
      state.articles = action.payload.articles;
      state.isLoading = false;
    },
    getArticlesFailure: (state, action: PayloadAction<{ error: Error }>) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
    clearArticles: (state) => {
      state.articles = [];
    },
  },
});

export const {
  getArticles,
  getArticlesSuccess,
  clearArticles,
  getArticlesFailure,
} = articlesSlice.actions;

export default articlesSlice.reducer;
