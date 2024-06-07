import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

class VerifyDTO {
  address: string;
  signature: Uint8Array;
  pubkey: string;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('verify')
  async postTest(@Body() body: VerifyDTO) {
    const address = body.address;
    const uint8arr = Uint8Array.from(body.signature);
    const signature = uint8arr.buffer;

    // console.log(address, signature);
    console.log(signature);

    const hash = await crypto.subtle.digest('SHA-256', signature);

    const publicJWK: JsonWebKey = {
      e: 'AQAB',
      ext: true,
      kty: 'RSA',
      n: body.pubkey,
    };

    // console.log(publicJWK)
    const verificationKey = await crypto.subtle.importKey(
      'jwk',
      publicJWK,
      {
        name: 'RSA-PSS',
        hash: 'SHA-256',
      },
      false,
      ['verify'],
    );

    const isValidSignature = await crypto.subtle.verify(
      { name: 'RSA-PSS', saltLength: 32 },
      verificationKey,
      signature,
      hash,
    );

    console.log(isValidSignature);

    return { valid: isValidSignature };
  }
}
