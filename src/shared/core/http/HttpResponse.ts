export interface Body {
  message?: string | string[] | null;
  data?: Record<string, any> | null;
}

export interface HttpResponse {
  body: Body;
  status: number;
}

export const created = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 201,
  };
};

export const ok = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 200,
  };
};

export const unauthorized = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 401,
  };
};

export const forbidden = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 403,
  };
};

export const badRequest = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 400,
  };
};

export const notFound = ({ data, message }: Body): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: 404,
  };
};

export const defaultResponse = ({
  data,
  message,
  status,
}: Body & { status: number }): HttpResponse => {
  return {
    body: {
      data: data || null,
      message: message || null,
    },
    status: status,
  };
};
