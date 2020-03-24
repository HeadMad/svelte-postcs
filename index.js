const postcss = require('postcss')
const path = require('path')
let PLUGINS = [], OPTIONS = {from: undefined}

let packagePath = path.resolve(__dirname.substring(0, __dirname.indexOf("node_modules")), 'package.json')
const package = require(packagePath)
 

if (package.postcss && package.postcss.plugins) {
  const plugins = package.postcss.plugins
  for (key in plugins) {
    PLUGINS.push(require(key)(plugins[key]))
  }
}

const style = async ({content}) => {
  console.log({PLUGINS, OPTIONS})
  if (!PLUGINS || !PLUGINS.length) return
  let code

  await postcss(PLUGINS)
    .process(content, OPTIONS)
    .then(result => {
      result.warnings().forEach(warn => console.warn(warn.toString()))
      code = result.css
    })
  return { code }
}

const sveltePostcssPlugin = (plugins = []) => {
  if (Array.isArray(plugins))
    PLUGINS = plugins
  return {style}
}

sveltePostcssPlugin.style = style

module.exports = sveltePostcssPlugin
