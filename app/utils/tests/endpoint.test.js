import { endpointFormatter } from 'Utils/endpoint';
import endpoints from 'Utils/enums/endpoints';

// Environment variables
const { env } = window;

const testDomainName = 'https://test-server.com';
const fetchTestEndpoint = '/fetchTest';
const fetchTestParamsEndpoint = '/fetchTest/{siteId}';

describe('endpoint', () => {
  describe('#endpointFormatter', () => {
    beforeEach(() => {
      env.domainName = testDomainName;
      endpoints.fetchTest = fetchTestEndpoint;
      endpoints.fetchTestParams = fetchTestParamsEndpoint;
    });

    it('should return empty string when no environment domain and endpoint do not exist ', () => {
      env.domainName = '';
      const expected = '';
      const actual = endpointFormatter('endpointNotExist');

      expect(expected).toBe(actual);
    });

    it('should return just domain name when endpoint does not exist', () => {
      const expected = testDomainName;
      const actual = endpointFormatter('endpointNotExist');

      expect(expected).toBe(actual);
    });

    it('should return an url', () => {
      const expected = `${testDomainName}${fetchTestEndpoint}`;
      const actual = endpointFormatter('fetchTest');

      expect(expected).toBe(actual);
    });

    it('should return an url with params', () => {
      const params = {
        siteId: 1,
      };
      const expected = `${testDomainName}${fetchTestEndpoint}/1`;
      const actual = endpointFormatter('fetchTestParams', params);

      expect(expected).toBe(actual);
    });
  });
});
