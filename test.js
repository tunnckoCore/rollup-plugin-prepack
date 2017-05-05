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

test('should transform return `null` if `id` not match to filter', (done) => {
  const plugin = prepack({
    include: 'foo.html'
  })
  const result = plugin.transform('foo bar', 'bar.js')

  test.strictEqual(result, null, 'should `result` of transform() be null')
  done()
})

test('should work as real plugin to rollup', (done) => {
  const promise = rollup.rollup({
    entry: 'fixtures/main.js',
    plugins: [prepack()]
  })

  return promise
    .then((bundle) => {
      const result = bundle.generate({ format: 'cjs' })

      test.strictEqual(/var main/.test(result.code), true)
      test.strictEqual(
        /_a = \\"A\\";\\n_b = \\"B\\";\\n_4 = 42;/.test(result.code),
        true
      )
      done()
    }, done)
    .catch(done)
})
