export default function getErrorMessage(code) {
  if (code === 1) {
    return 'The camel walks on a leg'
  } else if (code === 2) {
    return `Cats don't eat mouses`
  } else if (code === 3) {
    return 'The Car dont run'
  }
  throw new Error('No error messages for that code')
}