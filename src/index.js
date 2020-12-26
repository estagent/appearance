import {mergeOptions} from '@revgaming/helpers';
import Preference from '@revgaming/preference';
import translations from './translations';

let isDark = false;

let options;

const defaults = {
  class: 'dark',
};

const checkPreferDark = () => {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

const shouldDark = () => {
  const mode = Preference.get('appearance');

  if (mode === 'dark') return true;
  else if (mode === 'light') return false;
  else return checkPreferDark();
};

const setDarkMode = () => {
  isDark = shouldDark();
  if (isDark) {
    document.querySelector('html').classList.add(options.class);
  } else {
    document.querySelector('html').classList.remove(options.class);
  }
};

const watchDarkMode = () => {
  if (!window.matchMedia) return;
  window.matchMedia('(prefers-color-scheme: dark)').addListener(function() {
    Preference.unset('appearance');
    setDarkMode();
  });
};

const getAppearanceName = function() {
  const mode = Preference.get('appearance');
  if (mode === 'dark') return __('appearance.dark');
  else if (mode === 'light') return __('appearance.light');
  return __('appearance.auto');
};

export default function(opts) {
  options = mergeOptions(opts, defaults);
  setDarkMode();
  watchDarkMode();
  if (window['mergeTranslations'])
    mergeTranslations('appearance', translations);

  return {
    isDark: () => isDark,
    getAppearanceName: getAppearanceName,
    setAppearance: function(mode) {
      // Preference.set(
      //     'appearance',
      //     $(this).is(':checked')
      //         ? checkPreferDark()
      //             ? null
      //             : 'dark'
      //         : checkPreferDark()
      //         ? 'light'
      //         : null
      // )
      if (!['dark', 'light', 'auto'].includes(mode)) throw 'invalid code';
      Preference.set('appearance', mode);
      setDarkMode();
    },
  };
}

// const handleThemeChange = (event) => {
//     event.preventDefault()
//
//     let subContent = $(event.target)
//         .closest('[data-dropdown]')
//         .find('.sub-content')
//
//     if (!subContent.length) throw 'subContent not found'
//
//     subContent.html(`<h6>
//         <a href="javascript:;" class="flex-center close-sub-content icon-line" role="button">
//                    <i class="icon ia-arrow-l"></i>
//                 Koyu Tema
//             </a>
//          </h6>
//
//         <div class="sub-content-list">
//             <div class="theme-content">
//                 <p>
//                     Koyu tema, sayfanın parlak yüzeylerini karartarak gece kullanımına uygun hale getirir. Hemen deneyin!
//                     <br><br>
//                     Koyu tema ayarınız yalnızca bu tarayıcı için geçerli olur.
//                 </p>
//                 <label class="theme-checkbox">
//                  <input type="checkbox" name="dark"/ value="1" ${
//         isDark ? 'checked' : ''
//     }/>
//                     <span class="text">KOYU TEMA</span>
//                     <span class="checkbox"></span>
//                 </label>
//             </div>
//         </div>`)
//
//     $('input[name=dark]').on('change', function (e) {
//         Preference.set(
//             'appearance',
//             $(this).is(':checked')
//                 ? checkPreferDark()
//                 ? null
//                 : 'dark'
//                 : checkPreferDark()
//                 ? 'light'
//                 : null
//         )
//         setDarkMode()
//     })
// }