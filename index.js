/*!
 * rollup-plugin-prepack <https://github.com/tunnckoCore/rollup-plugin-prepack>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const prepack = require('prepack')

module.exports = function rollupPluginPrepack (options) {
  const handle = (str) => `export default ${str.trim()}`

  return {
    name: 'prepack',
    transform: (fileContents, filePath) => {
      const sources = [{
        fileContents,
        filePath,
        // suggest an alternative here
        sourceMapContents: null
      }]

      const { code, map } = prepack.prepackSources(sources, options)
      return { code: handle(code), map }
    }
  }
}
