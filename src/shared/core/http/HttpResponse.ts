import { HttpErrorProtocol } from '@shared/infra/http/errors/httpErrors';

export interface Body {
  message: string | string[] | null;
  data: Record<string, any> | null;
}

export interface HttpResponse {
  body: Body;
  status: number;
}

export const created = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data,
      message,
    },
    status: 201,
  };
};

export const ok = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data,
      message,
    },
    status: 200,
  };
};

export const errorResponse = (error: HttpErrorProtocol): HttpResponse => {
  return {
    body: {
      message: error.errors,
      data: null,
    },
    status: error.status,
  };
};
