const { RBush3D } = require('rbush-3d');

const tree = new RBush3D();

function rdm() {
	return Math.random() * 1000;
}

module.exports = () => {
	for (let i = 0; i < 1_000_000; i++) {
		const x = rdm(),
			y = rdm(),
			z = rdm();

		tree.insert({ maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z, tag: i });
	}

	const ptIdx = Math.round(500_000 + (Math.random() - 0.5) * 1000);
	const pt = tree.all()[ptIdx];

	pt.prop = 'hi';

	const { maxX: x, maxY: y, maxZ: z } = pt;

	console.log(tree.search({ maxX: x, minX: x, maxY: y, minY: y, maxZ: z, minZ: z }));
};
