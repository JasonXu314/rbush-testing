const { argv } = require('process');

const basicDemo = require('./demo');
const perfDemo = require('./perf');
const dirmodDemo = require('./dirmod');
const bulkInsertDemo = require('./bulkInsert');

switch (argv[2]) {
	case 'basic':
		basicDemo(argv[3] === 'small' || argv[3] === undefined);
		break;
	case 'perf':
		perfDemo(argv[3] === 'bignum');
		break;
	case 'dirmod':
		dirmodDemo();
		break;
	case 'bulkInsert':
		bulkInsertDemo();
		break;
}
