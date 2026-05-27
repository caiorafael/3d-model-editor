import { DocsApiTable } from "../docs-api-table";
import { DocsSection } from "../docs-section";

const PRIMITIVES_ROWS = [
  { method: "cuboid({ size })", description: "Caixa retangular. size: [x, y, z]." },
  { method: "cube({ size })", description: "Cubo com arestas iguais." },
  { method: "sphere({ radius })", description: "Esfera com raio definido." },
  { method: "cylinder({ radius, height })", description: "Cilindro alinhado ao eixo Z." },
  { method: "cylindricalEllipsoid({ radius, height })", description: "Elipsoide cilíndrico." },
  { method: "geodesicSphere({ radius, frequency })", description: "Esfera geodésica com subdivisões." },
  { method: "ellipsoid({ radius })", description: "Elipsoide com raios [x, y, z]." },
  { method: "roundedCuboid({ size, roundRadius })", description: "Cuboide com arestas arredondadas." },
];

const BOOLEANS_ROWS = [
  { method: "union(...geometries)", description: "Une múltiplas geometrias em uma." },
  { method: "subtract(a, b)", description: "Remove b de a. Pode ser usado diretamente no código." },
  { method: "intersect(a, b)", description: "Retorna apenas a interseção de duas geometrias." },
  { method: "scission(a, b)", description: "Divide a geometria a onde b intersecta." },
];

const TRANSFORMS_ROWS = [
  { method: "translate([x,y,z], geom)", description: "Move a geometria no espaço." },
  { method: "rotateX(angle, geom)", description: "Rotaciona no eixo X (radianos)." },
  { method: "rotateY(angle, geom)", description: "Rotaciona no eixo Y (radianos)." },
  { method: "rotateZ(angle, geom)", description: "Rotaciona no eixo Z (radianos)." },
  { method: "scale([x,y,z], geom)", description: "Escala a geometria nos três eixos." },
  { method: "mirror({ normal }, geom)", description: "Espelha a geometria em relação a um plano." },
];

const EXTRUSIONS_ROWS = [
  { method: "extrudeLinear({ height }, geom2)", description: "Extrusão linear de forma 2D." },
  { method: "extrudeRotate({ angle, startAngle }, geom2)", description: "Extrusão rotacional (lathe)." },
];

export const DocsOpenJscadSection = () => {
  return (
    <DocsSection
      id="openjscad"
      title="OpenJSCAD"
      description="Além das classes do sistema, você tem acesso completo à API @jscad/modeling para modelagem procedural avançada."
    >
      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Primitivas
      </h3>
      <DocsApiTable rows={PRIMITIVES_ROWS} />

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Operações booleanas
      </h3>
      <DocsApiTable rows={BOOLEANS_ROWS} />

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Transformações
      </h3>
      <DocsApiTable rows={TRANSFORMS_ROWS} />

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Extrusões
      </h3>
      <DocsApiTable rows={EXTRUSIONS_ROWS} />
    </DocsSection>
  );
};
