var self = {}
;['A', 'B', 42].forEach(function (x) {
  var name = '_' + x.toString()[0].toLowerCase()
  var y = parseInt(x)
  self[name] = y || x
})
