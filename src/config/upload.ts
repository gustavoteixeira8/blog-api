import { BadRequestError } from '@shared/core/http/httpErrors';
import { diskStorage, FileFilterCallback } from 'multer';
import { extname, resolve } from 'path';
import { randomBytes } from 'crypto';
import { Request } from 'express';

export const uploadConfig = {
  tempPath: resolve(__dirname, '..', '..', 'temp'),
  uploadPath: resolve(__dirname, '..', '..', 'uploads'),
  multer: {
    storage: diskStorage({
      destination(req, file, cb) {
        cb(null, resolve(uploadConfig.tempPath));
      },
      filename(req, file, cb) {
        const hash = randomBytes(10).toString('hex');

        cb(null, `${Date.now()}_${hash}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 2 * (1024 * 1024),
    },
    fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
      const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
      ];

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
        return;
      }

      cb(new BadRequestError('The supported types are jpeg, png, gif, bmp, webp'));
    },
  },

  storageProvider: {
    storageLocation: process.env.STORAGE_LOCATION_FILE,
    cloudinary: {
      cloudinaryOptions: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      },
    },
  },
};
