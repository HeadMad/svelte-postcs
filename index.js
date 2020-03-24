const postcss = require('postcss')
const path = require('path')
let PLUGINS = []
let OPTIONS = {from: undefined}

let rootPath = __dirname.substring(0, __dirname.indexOf("node_modules"))
const package = require(path.resolve(rootPath, 'package.json'))
 
if (package.postcss && package.postcss.plugins) {
  const plugins = package.postcss.plugins
  for (key in plugins) {
    PLUGINS.push(require(key)(plugins[key]))
  }
}

const runPostcss = (input) => {
  return postcss(PLUGINS)
    .process(input, OPTIONS)
    .then(result => {
      result.warnings().forEach(warn => console.warn(warn.toString()))
      return result.css
    })
}

const style = async ({content}) => {
  if (!PLUGINS.length) return
  let code
  await runPostcss(content)
    .then(css => code = css)
  return { code }
}

const sveltePostcssPlugin = (plugins = []) => {
  if (Array.isArray(plugins))
    PLUGINS = plugins
  return sveltePostcssPlugin
}

sveltePostcssPlugin.style = style
sveltePostcssPlugin.run = runPostcss

module.exports = sveltePostcssPlugin
