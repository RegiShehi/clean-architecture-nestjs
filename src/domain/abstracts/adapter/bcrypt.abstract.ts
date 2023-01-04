export abstract class IBcrypt {
  abstract hash(hashString: string): Promise<string>;
  abstract compare(data: string, hashedData: string): Promise<boolean>;
}
