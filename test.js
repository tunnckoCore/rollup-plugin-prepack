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
  const promise = rollup.rollup({
    entry: 'fixtures/main.js',
    plugins: [prepack()]
  })

  return promise
    .then((bundle) => {
      const { code } = bundle.generate({ format: 'cjs' })
      const expected = /var _\$0 = this;\n\n {2}_\$0\._a = "A";\n {2}_\$0\._b = "B";\n {2}_\$0\._4 = 42;\n/

      test.strictEqual(/var main/.test(code), true)
      test.strictEqual(expected.test(code), true)
      done()
    }, done)
    .catch(done)
})
