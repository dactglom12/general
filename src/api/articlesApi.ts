import axios, { AxiosResponse } from "axios";
import { Article } from "../store/articles/slice";
import cancellableAxiosRequest, {
  HTTPMethods,
} from "../utils/cancellableAxiosRequest";

const articlesAxiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2",
});

articlesAxiosInstance.interceptors.request.use((request) => {
  request.url += `&apiKey=${process.env.ARTICLES_API_SECRET_KEY}`;
  return request;
});

export interface GetArticlesRequestParams {
  queryString: string;
  from?: string;
}

export class ArticlesApi {
  static async getArticles(
    params: GetArticlesRequestParams
  ): Promise<AxiosResponse<Article[]>> {
    return cancellableAxiosRequest(
      HTTPMethods.GET,
      `/everything?${new URLSearchParams({
        q: params.queryString,
        from: params.from ?? "",
      })}`,
      articlesAxiosInstance
    );
  }
}
