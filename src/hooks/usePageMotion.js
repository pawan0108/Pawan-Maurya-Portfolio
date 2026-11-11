import { useEffect, useRef } from 'react'

/** Progressive enhancement: base content is visible; no pending/hidden reveal state exists. */
export default function usePageMotion(rootRef, paused) {
  const played = useRef(new WeakSet())

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const active = new Map()
    let revealObserver
    let ambientObserver
    let frame
    let ambientVisible = false
    const ambient = root.querySelector('[data-ambient]')

    function syncAmbient() {
      ambient?.setAttribute(
        'data-ambient-active',
        String(
          ambientVisible &&
            !paused &&
            !preference.matches &&
            document.visibilityState === 'visible',
        ),
      )
    }

    function stop() {
      cancelAnimationFrame(frame)
      revealObserver?.disconnect()
      ambientObserver?.disconnect()
      active.forEach((animation) => animation.cancel())
      active.clear()
      if (paused || preference.matches) {
        root.getAnimations?.({ subtree: true }).forEach((animation) => animation.cancel())
      }
      ambientVisible = false
      syncAmbient()
    }

    function isDestination(element) {
      const hash = window.location.hash.slice(1)
      return hash && document.getElementById(hash)?.contains(element)
    }

    function reveal(element, delay = 0) {
      if (played.current.has(element) || paused || preference.matches || isDestination(element))
        return
      played.current.add(element)
      if (element.contains(document.activeElement) || typeof element.animate !== 'function') return
      const animation = element.animate(
        [
          { opacity: 0.72, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: element.dataset.motion === 'hero' ? 650 : 520,
          delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
      )
      active.set(element, animation)
      animation.onfinish = () => {
        active.delete(element)
        animation.cancel()
      }
    }

    function start() {
      stop()
      if (paused || preference.matches) return
      // RAF avoids duplicate first-mount effects in development Strict Mode.
      frame = requestAnimationFrame(() => {
        root
          .querySelectorAll('[data-motion="hero"]')
          .forEach((element, index) => reveal(element, Math.min(index * 70, 210)))
        if (typeof IntersectionObserver !== 'function') return
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reveal(entry.target, Math.min(Number(entry.target.dataset.revealDelay) || 0, 140))
                revealObserver.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
        )
        root.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
        if (ambient) {
          ambientObserver = new IntersectionObserver(([entry]) => {
            ambientVisible = entry.isIntersecting
            syncAmbient()
          })
          ambientObserver.observe(ambient)
        }
      })
    }

    function showDestination() {
      root.querySelectorAll('[data-reveal], [data-motion="hero"]').forEach((element) => {
        if (isDestination(element)) {
          played.current.add(element)
          active.get(element)?.cancel()
          active.delete(element)
          revealObserver?.unobserve(element)
        }
      })
    }

    function handleFocus(event) {
      active.forEach((animation, element) => {
        if (element.contains(event.target)) {
          animation.cancel()
          active.delete(element)
        }
      })
    }

    function handleVisibility() {
      if (document.visibilityState !== 'visible') {
        active.forEach((animation) => animation.cancel())
        active.clear()
      }
      syncAmbient()
    }

    preference.addEventListener('change', start)
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('hashchange', showDestination)
    root.addEventListener('focusin', handleFocus)
    start()
    return () => {
      stop()
      preference.removeEventListener('change', start)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('hashchange', showDestination)
      root.removeEventListener('focusin', handleFocus)
    }
  }, [rootRef, paused])
}
