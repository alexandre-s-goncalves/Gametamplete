module.exports = {
  getLocales: jest.fn(() => [{ languageCode: 'en', countryCode: 'US' }]),
  getCalendars: jest.fn(() => []),
  getNumberFormatSettings: jest.fn(() => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  })),
  getTemperatureUnit: jest.fn(() => 'Celsius'),
  getTimeZone: jest.fn(() => 'UTC'),
};
