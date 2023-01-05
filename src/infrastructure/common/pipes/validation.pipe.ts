import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectSchema, ValidationOptions } from 'joi';
import { ExceptionsService } from 'src/infrastructure/services/exceptions/exceptions.service';

@Injectable()
export class JoiValidationPipe
  extends ExceptionsService
  implements PipeTransform
{
  constructor(private schema: ObjectSchema) {
    super();
  }

  transform(value: any) {
    const options: ValidationOptions = {
      errors: {
        wrap: {
          label: '',
        },
      },
      abortEarly: false,
    };

    const { error } = this.schema.validate(value, options);

    if (error) {
      const messages = error.details.map((d) => d.message).join(' && ');
      throw this.badRequestException(messages);
    }

    return value;
  }
}
