export function setErrorText (state, payload) {
  state.errorText = payload
}

export function setDevErrorText (state, payload) {
  state.devErrorText = payload
}

export function setOverlayState (state, payload) {
  state.isPopupShow = payload
}
