/// <reference types="vite/client" />

declare module 'photoswipe/dist/photoswipe-ui-default.js' {
  import type { UI } from 'photoswipe'
  const PhotoSwipeUI_Default: UI
  export default PhotoSwipeUI_Default
}
