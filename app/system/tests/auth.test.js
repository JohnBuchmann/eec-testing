import {
  getAccessAuthToken,
  getUser,
  getUserRoles,
  getUserAvatar,
  isUserAuthenticated,
  oktaAuthClient,
  refreshAccessToken,
  updateAuthState,
  getFirstName,
  getLastName,
  getSessionType,
} from '../auth';

const validTokenMock = 'Valid Token';
const renewTokensMock = { accessToken: validTokenMock };

describe('auth', () => {
  describe('getAccessAuthToken', () => {
    it('should return a valid token', () => {
      oktaAuthClient.getAccessToken = jest.fn(() => validTokenMock);

      const expected = validTokenMock;
      const actual = getAccessAuthToken();

      expect(actual).toBe(expected);
    });
  });

  describe('updateAuthState', () => {
    it('it should call function updateAuthState', () => {
      const expectedTrue = true;
      oktaAuthClient.authStateManager = {};
      oktaAuthClient.authStateManager.updateAuthState = jest.fn(
        () => expectedTrue
      );
      const expected = expectedTrue;
      const actual = updateAuthState();

      expect(actual).toBe(expected);
    });
  });

  describe('#refreshAccessToken', () => {
    it('should return a valid token when is resolved', async () => {
      oktaAuthClient.tokenManager = {};
      oktaAuthClient.tokenManager.setTokens = jest.fn(() => true);
      oktaAuthClient.token.renewTokens = jest.fn(() =>
        Promise.resolve(renewTokensMock)
      );

      const expected = validTokenMock;
      const actual = await refreshAccessToken();

      expect(actual).toBe(expected);
    });

    it('should return an error when is rejected', async () => {
      const expected = { error: 'Token error' };

      oktaAuthClient.token.renewTokens = jest.fn(() =>
        Promise.reject(expected)
      );

      await refreshAccessToken().catch((error) => {
        expect(error).toBe(expected);
      });
    });
  });

  describe('#isUserAuthenticated', () => {
    const mockAuthState = { isAuthenticated: true };

    it('should return true when call isUserAuthenticated', () => {
      oktaAuthClient.authStateManager = {
        getAuthState: jest.fn(() => mockAuthState),
      };

      const expected = true;
      const actual = isUserAuthenticated();

      expect(actual).toBe(expected);
    });
  });

  describe('#getUser', () => {
    const userClaims = {
      email: 'testing@testing.com',
      emailVerified: true,
      familyName: 'Test',
      givenName: 'Test',
    };

    it('should return a valid user data when getUser is resolved', async () => {
      oktaAuthClient.getUser = jest.fn(() => Promise.resolve(userClaims));

      const expected = userClaims;
      const actual = await getUser();

      expect(actual).toBe(expected);
    });
  });

  describe('#getUserRoles', () => {
    const userRolesMock = ['Role1'];
    const authStateMock = {
      accessToken: {
        claims: {
          groups: userRolesMock,
        },
      },
    };

    it('should return a valid user roles array', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(
        () => authStateMock
      );

      const expected = userRolesMock;
      const actual = getUserRoles();

      expect(actual).toBe(expected);
    });

    it('should return an empty user roles if authState does not exists', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(() => null);

      const expected = [];
      const actual = getUserRoles();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('#getUserAvatar', () => {
    const userAvatarMock = 'profile.jpg';
    const authStateMock = {
      accessToken: {
        claims: {
          avatar: 'profile.jpg',
        },
      },
    };

    it('should return a valid user avatar', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(
        () => authStateMock
      );

      const expected = userAvatarMock;
      const actual = getUserAvatar();

      expect(actual).toBe(expected);
    });

    it('should return an empty user avatar if authState does not exists', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(() => null);

      const expected = '';
      const actual = getUserAvatar();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('#getFirstName', () => {
    const firstNameMock = 'John';
    const authStateMock = {
      accessToken: {
        claims: {
          firstName: firstNameMock,
        },
      },
    };
    it('should return firstName property', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(
        () => authStateMock
      );
      const expected = firstNameMock;
      const actual = getFirstName();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('#getLastName', () => {
    const lastNameMock = 'Doe';
    const authStateMock = {
      accessToken: {
        claims: {
          lastName: lastNameMock,
        },
      },
    };
    it('should return lastName property', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(
        () => authStateMock
      );
      const expected = lastNameMock;
      const actual = getLastName();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('#getSessionType', () => {
    const sessionTypeMock = 'SSO';
    const authStateMock = {
      accessToken: {
        claims: {
          sessionType: sessionTypeMock,
        },
      },
    };
    it('should return getSessionType property', () => {
      oktaAuthClient.authStateManager.getAuthState = jest.fn(
        () => authStateMock
      );
      const expected = sessionTypeMock;
      const actual = getSessionType();

      expect(actual).toStrictEqual(expected);
    });
  });
});
