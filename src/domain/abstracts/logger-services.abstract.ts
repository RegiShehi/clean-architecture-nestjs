export abstract class ILogger {
  abstract debug(message: string, context: string): void;
  abstract log(message: string, context: string): void;
  abstract error(message: string, context: string, trace?: string): void;
  abstract warn(message: string, context: string): void;
  abstract verbose(message: string, context: string): void;
}
