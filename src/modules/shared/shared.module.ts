import { Global, Module, type Provider } from '@nestjs/common';

import { AppConfigService } from './services';

const providers: Provider[] = [AppConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
