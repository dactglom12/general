import { createAction } from "@reduxjs/toolkit";
import { GetArticlesRequestParams } from "../../api/articlesApi";

export const GET_ARTICLES_ACTION_TYPE = "GET_ARTICLES";

export const getArticles = createAction<GetArticlesRequestParams>(
  GET_ARTICLES_ACTION_TYPE
);
