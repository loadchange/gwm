import { humpToLine } from '../src/helpers/util';
import '@jest/globals';

describe('util', () => {
  it('should convert hump case to line case', () => {
    expect(humpToLine('helloWorld')).toBe('hello_world');
    expect(humpToLine('HelloWorld')).toBe('_hello_world');
    expect(humpToLine('already_line')).toBe('already_line');
    expect(humpToLine('')).toBe('');
  });
});