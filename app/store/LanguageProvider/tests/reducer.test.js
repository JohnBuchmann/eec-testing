import languageProviderReducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  let undefinedData;
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefinedData, {})).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    expect(
      languageProviderReducer(undefinedData, {
        type: CHANGE_LOCALE,
        locale: 'de',
      })
    ).toEqual({
      locale: 'de',
    });
  });
});
