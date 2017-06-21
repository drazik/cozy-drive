/* global __DEVELOPMENT__ */
import getReducers from '../../mobile/src/reducers'
import { saveState as savePersistedState } from './persistedState'
import RavenMiddleWare from 'redux-raven-middleware'
import createLogger from 'redux-logger'
import { ANALYTICS_URL, getConfig as getAnalyticsConfiguration } from '../../mobile/src/lib/reporter'

const saveState = store => {
  store.subscribe(() => savePersistedState({
    settings: store.getState().settings,
    mobile: {
      timestamp: store.getState().mobile.timestamp,
      settings: store.getState().mobile.settings,
      mediaBackup: {
        uploaded: store.getState().mobile.mediaBackup.uploaded
      }
    }
  }))
}

const loggerOptions = __DEVELOPMENT__ ? {} : {
  level: {
    prevState: false,
    nextState: false
  }
}
const loggerMiddleware = createLogger(loggerOptions)
const ravenMiddleWare = RavenMiddleWare(ANALYTICS_URL, getAnalyticsConfiguration())

const getMiddlewares = () => {
  let middlewares = [
    ravenMiddleWare,
    loggerMiddleware // must be the last middleware in chain https://git.io/vHQpt
  ]

  return middlewares
}

export { getReducers, saveState, getMiddlewares }