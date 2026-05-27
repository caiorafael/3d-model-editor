export const EXAMPLE_JSCAD_CODE = `const {
  ModelBuilder,
  ModelStyle,
  TextStyle,
  CutPlacement,
  TextFonts,
  cuboid,
  cylinder,
} = require('@jscad/modeling');

const main = () => {
  const model = new ModelBuilder();

  const baseStyle = new ModelStyle().color('#22d3ee');

  const cutStyle = new TextStyle()
    .font(TextFonts.SIMPLEX)
    .size(10)
    .depth(1.5)
    .stroke(0.8);

  const labelStyle = new TextStyle()
    .font(TextFonts.SIMPLEX)
    .color('#f59e0b')
    .size(8)
    .depth(1)
    .stroke(0.6);

  model.add(cuboid({ size: [40, 40, 5] }), baseStyle);

  model.subtract(
    cylinder({ radius: 5, height: 10 }),
    new CutPlacement().center(),
  );

  model.subtractText(
    '3D',
    cutStyle,
    new CutPlacement().top().offset(-8, 0, 0),
  );

  model.addText('texto', labelStyle);

  return model.build();
};

module.exports = { main };
`;
