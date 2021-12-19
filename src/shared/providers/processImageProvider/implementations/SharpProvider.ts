import { logger } from '@shared/log';
import fs from 'fs';
import { resolve, basename } from 'path';
import sharp from 'sharp';
import { ProcessImageProvider } from '../ProcessImageProvider';

export class SharpProvider implements ProcessImageProvider {
  public async convertToWebp(filepath: string): Promise<string> {
    const oldFilepath = resolve(filepath);
    const filename = basename(oldFilepath);
    const [filenameWithoutExt] = filename.split('.');
    const newFilepath = filepath.replace(filename, `${filenameWithoutExt}.webp`);

    try {
      await fs.promises.access(oldFilepath);

      await sharp(oldFilepath).webp().toFile(newFilepath);

      await fs.promises.unlink(oldFilepath);
    } catch (error) {
      logger.error(error);
      throw new Error('Image processor error');
    }

    return newFilepath;
  }
}
