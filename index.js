/*!
 * rollup-plugin-prepack <https://github.com/tunnckoCore/rollup-plugin-prepack>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const prepack = require('prepack')

module.exports = function rollupPluginPrepack (options) {
  return {
    name: 'prepack',
    transform: (fileContents) => {
      const handle = (str) => `export default ${JSON.stringify(str.trim())}`

      try {
        const sources = [{ fileContents }]
        const { code, map } = prepack.prepackSources(sources, options)

        return { code: handle(code), map }
      } catch (err) {
        throw err
      }
    }
  }
}
