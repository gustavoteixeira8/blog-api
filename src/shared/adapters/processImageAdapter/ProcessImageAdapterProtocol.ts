export interface ProcessImageAdapterProtocol {
  convertToWebp(filepath: string): Promise<string>;
}
