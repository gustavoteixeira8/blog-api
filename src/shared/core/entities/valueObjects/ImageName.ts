import { InvalidImageNameError } from '@shared/core/errors';
import { ValueObjectProtocol } from './ValueObjectProtocol';

export class ImageName extends ValueObjectProtocol<string> {
  public static create(image: string): ImageName | InvalidImageNameError {
    const imageFormatted = this.format(image);

    if (!this.validate(imageFormatted)) {
      return new InvalidImageNameError();
    }

    return new ImageName(imageFormatted);
  }

  public static format(image: string): string {
    return image.trim().toLowerCase();
  }

  public static validate(image: string): boolean {
    if (typeof image !== 'string') return false;

    const [, imageType] = image.split('.');
    const allowedTypes = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp'];
    const regexp = /[a-zA-Z0-9.a-zA-Z]/g.test(image);

    return regexp && allowedTypes.includes(imageType);
  }
}
