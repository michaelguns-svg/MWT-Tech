// Stand-in for `@sanity/workbench`, an optional dependency Sanity Studio only
// loads when running inside the hosted "Sanity Dashboard" product. We embed
// Studio directly in our own Next.js app instead, so this code path is dead —
// but bundlers still try to compile the real package (which ships broken,
// un-transpiled TypeScript) unless we redirect it here. See next.config.ts.
export const os = {
  subscribe: () => ({ unsubscribe() {} }),
  emit: () => {},
};
