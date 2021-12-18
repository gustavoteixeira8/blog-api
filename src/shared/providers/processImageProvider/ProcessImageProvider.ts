export interface ProcessImageProvider {
  convertToWebp(filepath: string): Promise<string>;
}
