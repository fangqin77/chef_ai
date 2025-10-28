// Minimal local shim for 'vue' to satisfy TS in uni-app (without node_modules)
declare module 'vue' {
  export type Ref<T = any> = { value: T }
  export type ShallowRef<T = any> = { value: T }
  export type Component = any
  export const ref: <T = any>(value?: T) => Ref<T>
  export const computed: <T = any>(getter: () => T) => Ref<T>
  export const onMounted: (hook: () => any) => void
  export const unref: <T = any>(arg: T | Ref<T>) => T
}


