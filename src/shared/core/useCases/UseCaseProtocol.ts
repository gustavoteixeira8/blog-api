export interface UseCaseProtocol<Request, Response> {
  execute(request: Request): Response;
}
