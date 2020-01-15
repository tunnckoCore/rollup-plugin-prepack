/* eslint-disable no-useless-escape */
/*!
 * rollup-plugin-prepack <https://github.com/tunnckoCore/rollup-plugin-prepack>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* eslint-env jest */

'use strict'

const fs = require('fs')
const path = require('path')
// const test = require('mukla')
const prepack = require('./index')

const rollup = require('rollup')

test('should main export return an object with transform() fn', () => {
  const plugin = prepack()

  expect(plugin.name).toEqual('prepack')
  expect(typeof plugin.transform).toEqual('function')
})

test('should work as real plugin to rollup', () => {
  // const expected = {
  //   'abstraction-tax.js': `var some;\n(function () {\n  var _$0 = this;\n\n  var _0 = {\n    _a: \"A\",\n    _b: \"B\",\n    _4: 42\n  };\n  _$0.some = _0;\n}).call(this);`,
  //   'env-branching.js': `var fib;\n(function () {\n  var _$1 = this;\n\n  var _7 = function (x) {\n    return x <= 1 ? x : fib(x - 1) + fib(x - 2);\n  };\n\n  _$1.fib = _7;\n\n  var _$0 = _$1.Date.now();\n\n  var _4 = 0 === _$0;\n\n  var _1 = _4 ? 55 : _$0;\n\n  _$1.result = _1;\n}).call(this);`,
  //   'fibinacci.js': `(function () {\n  var _$0 = this;\n\n  _$0.x = 610;\n}).call(this);`,
  //   'hello-world.js': `var hello, world, s;\n(function () {\n  var _$0 = this;\n\n  var _5 = function () {\n    return 'hello';\n  };\n\n  var _6 = function () {\n    return 'world';\n  };\n\n  _$0.hello = _5;\n  _$0.world = _6;\n  _$0.s = \"hello world\";\n  console.log(\"hello world\");\n}).call(this);`
  // }

  const promiseFixtures = fs.readdirSync('./fixtures')
    .map((x) => path.join(__dirname, 'fixtures', x))
    .map((fp) =>
      rollup
        .rollup({
          input: fp,
          plugins: [ prepack() ]
        })
        .then((bundle) => bundle.generate({ format: 'cjs' }))
    )

  return Promise.all(promiseFixtures)
    .then((results) => {
      return Promise.all(results.map(({ output }) => {
        const { code } = output[0]

        expect(code).toMatchSnapshot()
        // console.log(code)
        // test.strictEqual(code.includes(expected[fileName]), true)
      }))
    })
})

test('should transform throws an Error if the code is not valid', () => {
  function fixture () {
    const plugin = prepack()
    plugin.transform('foo bar baz')
  }

  expect(fixture).toThrow(/Syntax error: Unexpected token, expected/)
})
