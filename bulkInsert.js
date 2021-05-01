const { RBush3D } = require('rbush-3d');

const tree = new RBush3D();

function rdm() {
	return Math.random() * 1000;
}

module.exports = () => {
	console.time('one-by-one insert');
	for (let i = 0; i < 1_000_000; i++) {
		const x = rdm(),
			y = rdm(),
			z = rdm();

		tree.insert({ maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i });
	}
	console.timeEnd('one-by-one insert');

	console.time('one-by-one search');
	console.log(tree.search({ maxX: 100, minX: 0, maxY: 100, minY: 0, maxZ: 100, minZ: 0 }).length);
	console.timeEnd('one-by-one search');

	tree.clear();

	console.time('bulk insert');
	const data = new Array(1_000_000).fill(null).map((_, i) => {
		const x = rdm(),
			y = rdm(),
			z = rdm();

		return { maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i };
	});
	tree.load(data);
	console.timeEnd('bulk insert');

	console.time('bulk search');
	console.log(tree.search({ maxX: 100, minX: 0, maxY: 100, minY: 0, maxZ: 100, minZ: 0 }).length);
	console.timeEnd('bulk search');

	tree.clear();

	console.time('modified bulk insert');
	const octants = [[], [], [], [], [], [], [], []];

	for (let i = 0; i < 1_000_000; i++) {
		const x = rdm(),
			y = rdm(),
			z = rdm();

		const elem = { maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i };

		if (x > 500) {
			if (y > 500) {
				if (z > 500) {
					octants[0].push(elem);
				} else {
					octants[1].push(elem);
				}
			} else {
				if (z > 500) {
					octants[2].push(elem);
				} else {
					octants[3].push(elem);
				}
			}
		} else {
			if (y > 500) {
				if (z > 500) {
					octants[4].push(elem);
				} else {
					octants[5].push(elem);
				}
			} else {
				if (z > 500) {
					octants[6].push(elem);
				} else {
					octants[7].push(elem);
				}
			}
		}
	}

	for (const octant of octants) {
		tree.load(octant);
	}
	console.timeEnd('modified bulk insert');

	console.time('modified bulk search');
	console.log(tree.search({ maxX: 100, minX: 0, maxY: 100, minY: 0, maxZ: 100, minZ: 0 }).length);
	console.timeEnd('modified bulk search');
};
