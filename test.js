/*!
 * rollup-plugin-prepack <https://github.com/tunnckoCore/rollup-plugin-prepack>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const prepack = require('./index')

const rollup = require('rollup')

test('should main export return an object with transform() fn', (done) => {
  const plugin = prepack()

  test.strictEqual(plugin.name, 'prepack')
  test.strictEqual(typeof plugin.transform, 'function')
  done()
})

test('should work as real plugin to rollup', (done) => {
  const filePath = 'fixtures/main.js'
  const promise = rollup.rollup({
    entry: filePath,
    plugins: [ prepack() ]
  })

  return promise
    .then(async (bundle) => {
      const { code } = await bundle.generate({ format: 'cjs' })
      const expected = /\{\\n\s\svar\s_\$0\s=\sthis;\\n\\n\s\svar\s_0\s=\s\{\\n\s\s\s\s_a:\s\\"A\\",\\n\s\s\s\s_b:\s\\"B\\",\\n\s\s\s\s_4:\s42\\n\s\s\};/

      test.strictEqual(/var main/.test(code), true)
      test.strictEqual(expected.test(code), true)

      done()
    }, done)
    .catch(done)
})

test('should transform throws an Error if the code is not valid', (done) => {
  function fixture () {
    const plugin = prepack()
    plugin.transform('foo bar baz')
  }

  test.throws(fixture, /Syntax error: Unexpected token, expected/)
  done()
})
