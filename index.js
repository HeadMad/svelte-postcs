
const postcss = require('postcss')
const globalStyles = require('postcss-svelte-global-styles')
const path = require('path')
const fs = require('fs')

// const config = getConfigFromPakage('postcss')
// console.log(config)



const plugin = (plugins = []) => {
  const style = async ({content, attributes, filename}) => {
    if (attributes.global) plugins.push(globalStyles)
    if (!plugins.length) return
    let code

    await postcss(plugins)
      .process(content, {from: undefined})
      .then(result => {
        result.warnings().forEach(warn => console.warn(warn.toString()))
        code = result.css
      })
    return { code }
  }
  return {style}
}

module.exports = plugin