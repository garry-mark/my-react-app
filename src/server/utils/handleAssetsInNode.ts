import * as assetRequireHook from 'asset-require-hook';

assetRequireHook({
  name: '/[hash].[ext]',
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 10000
});
