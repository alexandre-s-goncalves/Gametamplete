module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|react-native-gesture-handler' +
      '|expo' +
      ')/)',
  ],
  moduleNameMapper: {
    '\\.(ttf|otf|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^expo-localization$': '<rootDir>/__mocks__/expoLocalizationMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/components/.*/index.ts',
    '<rootDir>/src/providers/.*/index.ts',
    '<rootDir>/src/hooks/.*/index.ts',
    '<rootDir>/src/resources/fonts.ts',
    '<rootDir>/src/constants/languages/index.ts',
  ],
};
