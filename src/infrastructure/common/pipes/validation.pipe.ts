import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema, ValidationOptions } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

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
      throw new BadRequestException(messages);
    }

    return value;
  }
}
