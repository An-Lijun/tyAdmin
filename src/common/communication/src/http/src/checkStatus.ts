type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export default function checkStatus(status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',) {

  switch (status) {
    case 400:
      break;
    case 401:
      break;
    case 403:
      break;
    case 404:
      break;
    case 405:
      break;
    case 408:
      break;
    case 500:
      break;
    case 501:
      break;
    case 502:
      break;
    case 503:
      break;
    case 504:
      break;
    case 505:
      break;
  }
}