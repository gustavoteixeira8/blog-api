export interface SanitizerProviderProtocol {
  sanitize(value: string): string;
}
