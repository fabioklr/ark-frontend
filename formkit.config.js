import { generateClasses } from '@formkit/themes'
import genesis from '@formkit/themes/tailwindcss/genesis'
import { de } from '@formkit/i18n'

export default {
  config: {
    classes: generateClasses(genesis),
    locales: { de },
    locale: 'de',
  },
}