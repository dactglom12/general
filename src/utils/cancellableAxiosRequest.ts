import axios, { AxiosInstance } from 'axios';
import { CANCEL } from 'redux-saga';

export enum HTTPMethods {
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  POST = 'POST',
  DELETE = 'DELETE',
}

const httpMethodsWithData = [
  HTTPMethods.PUT,
  HTTPMethods.PATCH,
  HTTPMethods.POST,
];

export default function cancellableAxiosRequest(
  method: HTTPMethods,
  url: string,
  instance: AxiosInstance | null = null,
  data = {},
  options = {},
) {
  const axiosClient = instance ?? axios;
  const hasData = httpMethodsWithData.indexOf(method) >= 0;
  const settings: any = hasData ? options : data;

  const source = axios.CancelToken.source();
  settings.cancelToken = source.token;

  const request = hasData
    ? axiosClient[method.toLowerCase()](url, data, settings)
    : axiosClient[method.toLowerCase()](url, settings);

  request[CANCEL] = () => source.cancel();

  return request;
}
