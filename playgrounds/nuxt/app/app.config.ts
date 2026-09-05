import type { Direction } from 'pohon-ui'

export default defineAppConfig({
  dir: 'ltr' as Direction,
  toaster: {
    position: 'bottom-right' as const,
    duration: 5000,
    max: 5,
    expand: true,
    disableSwipe: false
  },
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  }
})
