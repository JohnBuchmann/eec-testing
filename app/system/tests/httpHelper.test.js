import axios from 'axios';
import {
  HTTP_RESPONSE_INTERNAL_SERVER_ERROR,
  HTTP_RESPONSE_UNAUTHORIZED,
} from 'Utils/enums/http';
import { refreshAccessToken, getAccessAuthToken } from '../auth';
import {
  doGet,
  doPost,
  doPut,
  doPatch,
  doDelete,
  initializeHttpInterceptors,
} from '../httpHelper';

jest.mock('../auth', () => ({
  getAccessAuthToken: jest.fn(),
  refreshAccessToken: jest.fn(() => Promise.resolve('New Token')),
}));

describe('httpHelper', () => {
  describe('Resolve promises', () => {
    axios.get = jest.fn(() => Promise.resolve('Testing'));
    axios.post = jest.fn(() => Promise.resolve('Testing'));
    axios.put = jest.fn(() => Promise.resolve('Testing'));
    axios.patch = jest.fn(() => Promise.resolve('Testing'));
    axios.delete = jest.fn(() => Promise.resolve('Testing'));

    it('doGet', async () => {
      await expect(doGet('react')).resolves.toEqual('Testing');
    });

    it('doPost', async () => {
      await expect(doPost('react')).resolves.toEqual('Testing');
    });

    it('doPut', async () => {
      await expect(doPut('react')).resolves.toEqual('Testing');
    });

    it('doPatch', async () => {
      await expect(doPatch('react')).resolves.toEqual('Testing');
    });

    it('doDelete', async () => {
      await expect(doDelete('react')).resolves.toEqual('Testing');
    });
  });

  describe('Resolve interceptors', () => {
    initializeHttpInterceptors();

    it('API request should add authorization token to header', async () => {
      getAccessAuthToken.mockImplementation(() => 'token');
      const expectAuthorizationHeader = 'authorization';
      const expectAuthorizationHeaderValue = 'Bearer token';
      const actual = axios.interceptors.request.handlers[0].fulfilled({
        headers: {},
      }).headers;

      expect(actual).toHaveProperty(
        expectAuthorizationHeader,
        expectAuthorizationHeaderValue
      );
    });

    it('API request should not add  authorization token to header', async () => {
      getAccessAuthToken.mockImplementation(() => undefined);
      const expected = null;
      const actual = axios.interceptors.request.handlers[0].fulfilled({
        headers: {},
      });

      expect(actual).toBe(expected);
    });

    it('request should add authorization token to header', async () => {
      const expected = 'Response testing data';
      const actual = axios.interceptors.response.handlers[0].fulfilled({
        data: expected,
      });

      expect(actual).toBe(expected);
    });

    it('request should throw an error when response has 500 error code', async () => {
      expect(() => {
        axios.interceptors.response.handlers[0].rejected({
          response: { status: HTTP_RESPONSE_INTERNAL_SERVER_ERROR },
        });
      }).toThrow();
    });

    it('request should throw an error when response has 401 error code and token attempt goes to limit', async () => {
      expect(() => {
        axios.interceptors.response.handlers[0].rejected({
          response: {
            status: HTTP_RESPONSE_UNAUTHORIZED,
            config: { refreshTokenAttempt: 5 },
          },
        });
      }).toThrow();
    });

    it('request should call refreshAccessToken when when response has 401 error code', async () => {
      axios.interceptors.response.handlers[0].rejected({
        response: {
          status: HTTP_RESPONSE_UNAUTHORIZED,
          config: {},
        },
      });

      expect(refreshAccessToken).toHaveBeenCalled();
    });
  });
});
