import { Constants } from 'expo'

const isDev = process.env.NODE_ENV === 'development'

const getHostMachine = () => {
  const ip = Constants.manifest.debuggerHost.split(':')[0]
  return `http://${ip}:8080`
}

export default {
  api: isDev ? getHostMachine() : Constants.manifest.extra.api,
  verificationCodeLength: 6
}
