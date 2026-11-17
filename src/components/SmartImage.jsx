import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

// Preview the loading shimmer while developing: add ?slow-images to the address and every image waits 3 seconds.
// (Local images load almost instantly, so otherwise it's gone before you can see it. Ignored on the live site.)
const previewDelay = import.meta.env.DEV && new URLSearchParams(window.location.search).has('slow-images') ? 3000 : 0
const markLoaded = (setLoaded) => (previewDelay ? setTimeout(() => setLoaded(true), previewDelay) : setLoaded(true))

// Shows the image, or a gradient placeholder when the file isn't in /public yet.
// While it loads, a soft shimmer (purple in dark mode, sky blue in light) runs across its box, then it fades in.
export default function SmartImage({ src, alt, className = '', fallbackLabel }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  // An image already in the browser's cache can finish before React listens for onLoad
  const checkCached = (img) => {
    if (img?.complete && img.naturalWidth) markLoaded(setLoaded)
  }

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-linear-to-br from-tint-blue to-tint-purple text-fg-subtle ${className}`}
      >
        <ImageIcon className="size-8" />
        {fallbackLabel && <span className="px-4 text-center text-xs">{fallbackLabel}</span>}
      </div>
    )
  }

  return (
    <img
      ref={checkCached}
      src={src}
      alt={alt}
      className={`${loaded ? 'img-fade-in' : 'img-shimmer'} ${className}`}
      onLoad={() => markLoaded(setLoaded)}
      onError={() => setFailed(true)}
    />
  )
}
