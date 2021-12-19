import { logger } from '@shared/log';
import fs from 'fs';
import { resolve } from 'path';
import { Filetype, StorageProviderProtocol, StorageResponse } from '../StorageProviderProtocol';

export class DiskStorageProvider implements StorageProviderProtocol {
  private readonly _tempPath: string = resolve('temp');
  private readonly _uploadPath: string = resolve('uploads');

  public async save(filename: string, filetype: Filetype): Promise<StorageResponse> {
    const oldPath = resolve(this._tempPath, filename);
    const newPath = resolve(this._uploadPath, filetype, filename);

    try {
      await fs.promises.access(oldPath);

      await fs.promises.rename(oldPath, newPath);
    } catch (error) {
      logger.error(error);
      throw new Error('Storage provider error');
    }

    return { location: newPath, filename };
  }

  public async delete(filename: string, filetype: Filetype): Promise<void> {
    const filePath = resolve(this._uploadPath, filetype, filename);

    try {
      await fs.promises.access(filePath);

      await fs.promises.unlink(filePath);
    } catch (error) {
      logger.error(error);
      throw new Error('Storage provider error');
    }
  }
}
