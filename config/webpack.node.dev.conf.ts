import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import nodeBaseConf from './webpack.node.base.conf';

const nodeConfig: webpack.Configuration = merge(nodeBaseConf, {
  mode: 'development',
  entry: [path.resolve(__dirname, '../src/server/index.dev.ts')]
});

export default nodeConfig;
