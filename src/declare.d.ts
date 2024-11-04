declare const ymaps: any

declare module '*.svg' {
  const filePath: string

  export default filePath
}

declare module './shared/useFetch'
declare module './shared/useWords'

// declare module '@vue/runtime-core' {
//   export interface GlobalComponents {
//     LottieAnimation: typeof import('vue3-lottie')['Vue3Lottie']
//   }
// }
