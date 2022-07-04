export interface HttpRequest {
  headers: Record<string, any>;
  body: Record<string, any>;
  query: Record<string, any>;
  params: Record<string, any>;
  file?: Record<string, any>;
  userData: Record<string, any>;
}
