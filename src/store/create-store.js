
const createStore = (options) => {
  const { state: stateFactory, getters: getterConfigs, actions: actionConfigs } = options
  const store = Object.create(null)
  const state = stateFactory()
  const listeners = []
  Object.defineProperty(store, 'subscribe', {
    get: () => cb => {
      if (typeof cb !== 'function') {
        return () => undefined
      }
      const size = listeners.push((key, value, oldValue) => cb(key, value, oldValue))
      return () => {
        listeners.splice(size - 1, 2)
      }
    }
  })
  Object.keys(state).forEach(key => {
    Object.defineProperty(store, key, {
      get: () => state[key],
      set: value => {
        state[key] = value
      }
    })
  })
  Object.keys(getterConfigs).forEach(key => {
    const getter = getterConfigs[key]
    Object.defineProperty(store, key, {
      get: () => getter.call(store, state)
    })
  })
  Object.keys(actionConfigs).forEach(key => {
    const action = actionConfigs[key]
    Object.defineProperty(store, key, {
      get: () => action.bind(store, state)
    })
  })
  const useStore = () => store
  return useStore
}


const reactive = obj => {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: () => {
        return value
      },
      set: val => {
        value = val
      }
    })
  })
}