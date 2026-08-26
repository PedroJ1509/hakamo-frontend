type ScrollFn = () => void;

const listeners = new Set<ScrollFn>();

export function emitSiteScroll() {
  listeners.forEach((fn) => fn());
}

export function onSiteScroll(fn: ScrollFn) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
