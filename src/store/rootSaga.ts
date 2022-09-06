import { all } from 'redux-saga/effects';
import { watchFetchArticles } from './articles/saga';

export default function* rootSaga() {
  yield all([watchFetchArticles()]);
}
