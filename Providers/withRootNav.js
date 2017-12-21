let rootNav 
export default {
  update: (n) => {
    console.log('updating ', n)
    rootNav = n
  },
  get: () => rootNav
}
