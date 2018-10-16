const fs = require('fs');
const path = require('path');

module.exports = async ctx => {
	ctx.type = 'html';
	ctx.body = fs.createReadStream(
		path.join(__dirname, '../../../dist/index.html')
	);
};
