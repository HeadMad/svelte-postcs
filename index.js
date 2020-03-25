const postcss = require('postcss')
const {plugins, options} = require('./lib/config')

const runPostcss = (input) => {
  return postcss(plugins)
    .process(input, options)
    .then(result => {
      result.warnings().forEach(warn => console.warn(warn.toString()))
      return result.css
    })
}

const style = async ({content}) => {
  if (!plugins.length) return
  let code
  await runPostcss(content)
    .then(css => code = css)
  return { code }
}

const sveltePostcssPlugin = (plugs = []) => {
  if (Array.isArray(plugs))
    plugins = plugs
  return sveltePostcssPlugin
}

sveltePostcssPlugin.style = style
sveltePostcssPlugin.run = runPostcss

module.exports = sveltePostcssPlugin
