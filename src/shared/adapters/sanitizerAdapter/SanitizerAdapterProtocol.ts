export interface SanitizerAdapterProtocol {
  sanitize(value: any): string | any;
}
