import { Constants } from 'expo'

const isDev = process.env.NODE_ENV === 'development'

const getHostMachine = () => {
  const ip = Constants.manifest.debuggerHost.split(':')[0]
  return `http://${ip}:8080`
}

export default {
  api: isDev ? getHostMachine() : Constants.manifest.extra.api,
  verificationCodeLength: 4,
  theme: {
    colors: {
      blue: '#2892D7',      
      blueDark: '#1B3B6F',
      blueLight: '#6DAEDB',
      green: '#06D6A0',
      gray: '#D3D3D3'
    }, 
    space: 10
  }
}
