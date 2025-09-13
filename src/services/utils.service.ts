import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
@Injectable()
export class UtilsService {
     async generateQRCode(url: string, secret) {
    // return await qrcode.toDataURL(url);
    return await qrcode.toFile(`./public/images/qrcodes/${secret}.png`, url);
  }
}
