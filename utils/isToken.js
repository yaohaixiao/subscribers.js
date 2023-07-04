const isToken = (str) => {
  const pattern = /^guid-\d+$/i
  return pattern.test(str)
}

export default isToken
