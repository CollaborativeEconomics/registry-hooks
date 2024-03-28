import { describe, it, expect } from 'bun:test'
import init, { getRegistryApiKey, getRegistryBaseUrl } from '../init';

describe('init', () => {
  afterEach(() => {
    init({ registryApiKey: '', registryBaseUrl: 'https://registry.cfce.io/api' });
  })
  it('should set registryApiKey and registryBaseUrl', () => {
    init({ registryApiKey: 'testKey', registryBaseUrl: 'testUrl' });

    expect(getRegistryApiKey()).toBe('testKey');
    expect(getRegistryBaseUrl()).toBe('testUrl');
  });

  it('should not change registryBaseUrl if not provided', () => {
    init({ registryApiKey: 'anotherKey' });

    expect(getRegistryApiKey()).toBe('anotherKey');
    expect(getRegistryBaseUrl()).toBe('testUrl');
  });
});