import { IAWSConfig } from './aws-config.abstract';
import { IDataBaseConfig } from './database-config.abstract';

export abstract class IEnvironmentConfig {
  abstract getServerPort(): number;
  abstract logger: IAWSConfig;
  abstract db: IDataBaseConfig;
}
