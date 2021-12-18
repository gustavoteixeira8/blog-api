export type OrderByProtocol<T = Record<string, any>> = Partial<Record<keyof T, 'ASC' | 'DESC'>>;

export interface PaginationResponseProtocol<T> {
  page: number;
  perPage: number;
  order: OrderByProtocol | null;
  maxPage: number;
  maxItems: number;
  data: T[];
}

export interface PaginationOptionsProtocol {
  page: number;
  perPage: number;
  order: OrderByProtocol;
}
