/*!
 * rollup-plugin-prepack <https://github.com/tunnckoCore/rollup-plugin-prepack>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const prepack = require('prepack')
const utils = require('rollup-pluginutils')

module.exports = function rollupPluginPrepack (options) {
  options = Object.assign({ include: '**/*.js' }, options)

  const filter = utils.createFilter(options.include, options.exclude)
  const handle = (str) => `export default ${JSON.stringify(str.trim())}`

  return {
    name: 'prepack',
    transform: (source, id) => {
      if (!filter(id)) return null

      let { code, map } = prepack.prepack(source, options)
      return { code: handle(code), map }
    }
  }
}
