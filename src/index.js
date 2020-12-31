import {mergeTranslations} from '@revgaming/languages'
import Preference from '@revgaming/preference'
import translations from './translations'

export let isDark = false
const options = {}

export const bootAppearance = darkClass => {
  options.darkClass = darkClass ?? 'dark'
  setDarkMode()
  watchDarkMode()
  mergeTranslations('appearance', translations)
  return {
    isDark: isDark,
    setAppearance: setAppearance,
    getAppearanceName: getAppearanceName,
    getAppearances: getAppearances,
  }
}

export const getAppearanceName = mode => {
  if (!mode) mode = Preference.get('appearance')
  if (mode === 'dark') return __('appearance.dark')
  else if (mode === 'light') return __('appearance.light')
  return __('appearance.auto')
}

export const getAppearances = () => {
  const data = []
  ;['auto', 'dark', 'light'].forEach(function (item) {
    data.push({
      code: item,
      name: getAppearanceName(item),
    })
  })
  return data
}
const checkPreferDark = () => {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}
const shouldDark = () => {
  const mode = Preference.get('appearance')

  if (mode === 'dark') return true
  else if (mode === 'light') return false
  else return checkPreferDark()
}
const setDarkMode = () => {
  isDark = shouldDark()
  if (isDark) {
    document.querySelector('html').classList.add(options.darkClass)
  } else {
    document.querySelector('html').classList.remove(options.darkClass)
  }
}
const watchDarkMode = () => {
  if (!window.matchMedia) return
  window.matchMedia('(prefers-color-scheme: dark)').addListener(function () {
    Preference.unset('appearance')
    setDarkMode()
  })
}

export const setAppearance = mode => {
  if (!['dark', 'light', 'auto'].includes(mode)) throw 'invalid code'
  Preference.set('appearance', mode)
  setDarkMode()
  return true
}
