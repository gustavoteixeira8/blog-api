import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';
import fs from 'fs';
import { uploadConfig, uploadProviderConfig } from '@config/upload';
import { Filetype, StorageProviderProtocol, StorageResponse } from '../StorageProviderProtocol';
import { logger } from '@shared/log';

export class CloudinaryStorageProvider implements StorageProviderProtocol {
  private readonly _cloudinaryConfig = uploadProviderConfig.cloudinary.cloudinaryOptions;
  private readonly _tempPath = uploadConfig.tempPath;

  constructor() {
    cloudinary.config(this._cloudinaryConfig);
  }

  public async save(filename: string, filetype: Filetype): Promise<StorageResponse> {
    let response: UploadApiResponse;

    try {
      response = await cloudinary.uploader.upload(resolve(this._tempPath, filename), {
        async: false,
        timestamp: Date.now(),
        use_filename: true,
        folder: 'blog',
        public_id: filename.split('.')[0],
        type: 'upload',
        resource_type: filetype,
      });

      await fs.promises.unlink(resolve(this._tempPath, filename));
    } catch (error) {
      logger.error(error);
      throw new Error('Storage provider error');
    }

    return {
      filename,
      location: response.secure_url,
    };
  }

  public async delete(filename: string, filetype: Filetype): Promise<void> {
    try {
      await cloudinary.uploader.destroy(`blog/${filename.split('.')[0]}`, {
        resource_type: filetype,
        type: 'upload',
        invalidate: true,
      });
    } catch (error) {
      logger.error(error);
      throw new Error('Storage provider error');
    }
  }
}
