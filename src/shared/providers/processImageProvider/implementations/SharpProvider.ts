import fs from 'fs';
import { resolve, basename } from 'path';
import sharp from 'sharp';
import { ProcessImageProvider } from '../ProcessImageProvider';

export class SharpProvider implements ProcessImageProvider {
  public async convertToWebp(filepath: string): Promise<string> {
    const oldFilepath = resolve(filepath);

    try {
      await fs.promises.access(oldFilepath);
    } catch (error) {
      throw new Error('Image processor error');
    }

    const filename = basename(oldFilepath);
    const [filenameWithoutExt] = filename.split('.');
    const newFilepath = filepath.replace(filename, `${filenameWithoutExt}.webp`);

    try {
      await sharp(oldFilepath).webp().toFile(newFilepath);
    } catch (error) {
      throw new Error('Image processor error');
    }

    await fs.promises.unlink(oldFilepath);

    return newFilepath;
  }
}
