var mutexify = require('.')

var mutexifyPromise = function () {
  var lock = mutexify()

  var acquire = function () {
    return new Promise((resolve) => {
      lock((release) => {
        resolve(release)
      })
    })
  }

  Object.defineProperty(acquire, 'locked', {
    get: function () { return lock.locked },
    enumerable: true
  })

  return acquire
}

module.exports = mutexifyPromise
