export const EXAMPLE_JSCAD_CODE = `const { cuboid, cylinder, subtract } = require('@jscad/modeling');

const main = () => {
  const base = cuboid({ size: [40, 40, 5] });
  const hole = cylinder({ radius: 5, height: 10 });

  return subtract(base, hole);
};

module.exports = { main };
`;
