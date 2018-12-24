import * as cssModulesRequireHook from 'css-modules-require-hook';

// import * as postcssImport from 'postcss-mixins';

// import * as postcssMixins from 'postcss-import';

// import * as postcssPresetWnv from 'postcss-preset-env';

cssModulesRequireHook({
  // prepend: [
  // 	postcssMixins(),
  // 	postcssImport(),
  // 	postcssPresetWnv({
  // 		stage: 0
  // 	})
  // ],
  camelCase: true,
  generateScopedName: '[local]--[hash:base64:5]'
});
