// import * as fs from 'fs';
// import * as path from 'path';

export default async (ctx: any) => {
	ctx.type = 'html';
	// ctx.body = fs.createReadStream(
	// 	path.join(__dirname, '../../../dist/index.html')
	// );
	ctx.body = '128';
};
