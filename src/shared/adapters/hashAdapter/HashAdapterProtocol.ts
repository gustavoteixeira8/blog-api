export interface HashAdapterProtocol {
  generate(s: string): Promise<string>;
  compare(s: string, hash: string): Promise<boolean>;
}
