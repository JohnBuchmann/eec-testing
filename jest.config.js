/* eslint-disable */
module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/**/Loadable.{js,jsx}',
    '!app/**/*.configuration.{js,jsx}',
    '!app/env/config.js',
    '!app/config.template.js',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 73,
      functions: 75,
      lines: 75,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/?!'],
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    'Assets/(.*)$': '<rootDir>/app/assets/$1',
    'Components/(.*)$': '<rootDir>/app/components/$1',
    'Containers/(.*)$': '<rootDir>/app/containers/$1',
    'Environment/(.*)$': '<rootDir>/app/env/$1',
    'Utils/(.*)$': '<rootDir>/app/utils/$1',
    'Internals/(.*)$': '<rootDir>/internals/$1',
    'Store/(.*)$': '<rootDir>/app/store/$1',
    'System/(.*)$': '<rootDir>/app/system/$1',
    '^Theme$': '<rootDir>/app/theme.js',
    'Config/(.*)$': '<rootDir>/app/config/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/enzyme.setup.js',
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
  ],
  setupFiles: ['raf/polyfill', 'jest-canvas-mock'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
  testResultsProcessor: 'jest-sonar-reporter',
};
