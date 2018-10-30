import * as tsConfig from '../../../tsconfig.json';

import * as tsConfigPaths from 'tsconfig-paths';

const baseUrl = './'; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
	baseUrl,
	paths: tsConfig.compilerOptions.paths
});
