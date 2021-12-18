export type Filetype = 'image' | 'pdf' | 'cvs';
export type StorageAction = 'SAVE' | 'DELETE';

export interface StorageResponse {
  filename: string;
  location: string;
}

export interface StorageOptions {
  filename: string;
  filetype: Filetype;
  action: StorageAction;
}

export interface StorageProviderProtocol {
  save(filename: string, filetype: Filetype): Promise<StorageResponse>;
  delete(filename: string, filetype: Filetype): Promise<void>;
}
