module.exports = (env) => {
  return function setEnv (done) {
    global[env] = env
    if (done) { done() }
  }
}
