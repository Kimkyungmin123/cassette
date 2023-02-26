const rotatePath = (path: SVGPathElement, angle: number) => {
  const centerX = path.getBBox().x + path.getBBox().width / 2;
  const centerY = path.getBBox().y + path.getBBox().height / 2;

  path.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
};

const animationCalc = { rotatePath };
export default animationCalc;
