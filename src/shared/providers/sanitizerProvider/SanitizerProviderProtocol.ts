export interface SanitizerProviderProtocol {
  sanitize(value: any): string | any;
}
