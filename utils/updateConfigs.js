const recast = require('recast');

const updateConfigs = function(params) {
  // Load config file
  const ast = recast.parse(params.configs);
  // Filter themeConfig property
  const themeConfig = ast.program.body[0].expression.right.properties.filter(element => {
    if (element.key.name === 'themeConfig') return true;
    return false;
  })[0];
  if (!themeConfig) return;
  // Filter option property
  const property = themeConfig.value.properties.filter(element => {
    if (element.key.name === params.option) return true;
    return false;
  })[0].value.elements;
  if (!property) return;
  const route = JSON.parse(JSON.stringify(property[0]));
  if (route.elements) {
    route.elements[0].value = `/${params.props.pageSlug}/`;
    route.elements[1].value = params.props.pageName;
  } else {
    route.properties[0].value.value = params.props.pageName;
    route.properties[1].value.value = `/${params.props.pageSlug}/`;
  }
  property.push(route); // Add new route
  return recast.print(ast).code;
};

module.exports = updateConfigs;
