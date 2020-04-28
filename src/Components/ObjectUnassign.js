export default (target, source) => {
  Object.keys(source).forEach((key) => {
    delete target[key]
  })
}
