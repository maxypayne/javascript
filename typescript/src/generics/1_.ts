function identity<T>(arg: string): number {
  return arg.length;
}


identity<string>('string');
