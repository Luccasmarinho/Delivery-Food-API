export interface IvalidateBody {
  error: string[];
  statusCode: number;
  fields: {
    path: string;
    message: string;
  }[];
}

export interface IError {
  statusCode: number;
  message: string;
}
