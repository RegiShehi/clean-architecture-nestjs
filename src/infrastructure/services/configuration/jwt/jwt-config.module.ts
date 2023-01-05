import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IJWTConfig } from 'src/domain/abstracts/config/jwt-config.abstract';
import { JWTConfigService } from './jwt-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [
    {
      provide: IJWTConfig,
      useClass: JWTConfigService,
    },
  ],
  exports: [IJWTConfig],
})
export class JWTConfigModule {}
