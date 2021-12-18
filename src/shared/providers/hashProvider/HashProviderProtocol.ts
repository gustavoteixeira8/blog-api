export interface HashProviderProtocol {
  generate(s: string): Promise<string>;
  compare(s: string, hash: string): Promise<boolean>;
}
