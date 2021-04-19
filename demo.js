const { RBush3D } = require('rbush-3d');

const tree = new RBush3D();

function rdm() {
	return Math.random() * 1000;
}

module.exports = (small) => {
	const param = small ? 10 : 100;
	manualSearch = [];
	
	for (let i = 0; i < 1_000_000; i++) {
		const x = rdm(), y = rdm(), z = rdm();
	
		if (x < param && y < param && z < param) {
			manualSearch.push(i);
		}
	
		tree.insert({ maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i });
	}
	
	const results = tree.search({ minX: 0, maxX: param, minY: 0, maxY: param, minZ: 0, maxZ: param });
	
	// let noMatch = false;
	// for (const tag of manualSearch) {
	// 	if (!results.some((res) => res.tag === tag)) {
	// 		console.log(`No match on tag ${tag}`);
	// 		noMatch = true;
	// 	}
	// }
	
	// if (!noMatch) {
	// 	console.log('All tags match');
	// }
	
	console.log(results);
	console.log(manualSearch);
}