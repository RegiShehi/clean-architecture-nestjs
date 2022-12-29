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
    };

    const { error } = this.schema.validate(value, options);

    if (error && error.isJoi) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
