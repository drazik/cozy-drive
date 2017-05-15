import { connect } from 'react-redux'
import Settings from '../components/Settings'
import { setWifiOnly, setAnalytics } from '../actions/settings'
import { showUnlinkConfirmation, hideUnlinkConfirmation, unlink } from '../actions/unlink'
import { backupImages, startMediaBackup, cancelMediaBackup } from '../actions/mediaBackup'
import { backupAllowed } from '../lib/network'

const mapStateToProps = (state, ownProps) => ({
  mediaUploading: state.mobile.mediaBackup.uploading,
  version: window.navigator.appInfo ? window.navigator.appInfo.version : 'dev',
  serverUrl: state.mobile.settings.serverUrl,
  backupImages: state.mobile.settings.backupImages,
  analytics: state.mobile.settings.analytics,
  displayUnlinkConfirmation: state.mobile.ui.displayUnlinkConfirmation,
  client: state.settings.client,
  wifiOnly: state.mobile.settings.wifiOnly,
  backupAllowed: backupAllowed(state.mobile.settings.wifiOnly)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleBackup: (launch, dir) => {
    if (launch) {
      dispatch(startMediaBackup(dir, true))
    } else {
      dispatch(cancelMediaBackup())
    }
  },
  showUnlinkConfirmation: () => dispatch(showUnlinkConfirmation()),
  hideUnlinkConfirmation: () => dispatch(hideUnlinkConfirmation()),
  unlink: (client) => {
    dispatch(unlink(client))
    ownProps.router.replace('/onboarding')
  },
  setBackupImages: (e) => dispatch(backupImages(e.target.checked)),
  setWifiOnly: async (e) => {
    await dispatch(setWifiOnly(e.target.checked))
    dispatch(backupImages())
  },
  setAnalytics: (e) => dispatch(setAnalytics(e.target.checked))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)