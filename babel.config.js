module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            screens: './src/screens',
            providers: './src/providers',
            hooks: './src/hooks',
            components: './src/components',
            i18n: './src/i18n',
            types: './src/types',
            constants: './src/constants',
            resources: './src/resources',
            routes: './src/routes',
          },
        },
      ],
    ],
  };
};
