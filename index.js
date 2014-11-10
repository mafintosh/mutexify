var mutexify = function() {
  var queue = []
  var used = false

  var acquire = function(fn) {
    if (used) return queue.push(fn)
    used = true
    fn(release)
    return 0
  }

  var release = function(fn, err, value) {
    used = false
    if (queue.length) acquire(queue.shift())
    if (fn) fn(err, value)
  }

  return acquire
}

module.exports = mutexify