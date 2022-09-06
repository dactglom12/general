import { call, put, takeEvery } from 'redux-saga/effects';
import { ArticlesApi } from '../../api/articlesApi';
import { GET_ARTICLES_ACTION_TYPE } from './actions';
import { getArticlesFailure, getArticlesSuccess, getArticles } from './slice';

export function* fetchArticles(action) {
  try {
    yield put(getArticles());

    const response = yield call(ArticlesApi.getArticles, {
      queryString: action.payload.queryString,
    });

    yield put(
      getArticlesSuccess({ articles: response.data.articles.slice(0, 3) }),
    );
  } catch (err) {
    yield put(getArticlesFailure({ error: err }));
  }
}

export function* watchFetchArticles() {
  yield takeEvery(GET_ARTICLES_ACTION_TYPE, fetchArticles);
}
