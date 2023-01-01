export abstract class IException {
  abstract badRequestException(message?: string): void;
  abstract internalServerErrorException(message?: string): void;
  abstract forbiddenException(message?: string): void;
  abstract unauthorizedException(message?: string): void;
  abstract notFoundException(message?: string): void;
}
