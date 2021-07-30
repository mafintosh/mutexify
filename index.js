var mutexify = function () {
  var queue = []
  var used = null

  var call = function () {
    used(release)
  }

  var acquire = function (fn) {
    if (used) return queue.push(fn)
    used = fn
    acquire.locked = true
    typeof window === 'undefined' ? process.nextTick(call) : setTimeout(call, 0)
    return 0
  }

  acquire.locked = false

  var release = function (fn, err, value) {
    used = null
    acquire.locked = false
    if (queue.length) acquire(queue.shift())
    if (fn) fn(err, value)
  }

  return acquire
}

module.exports = mutexify
