declare const ymaps: any

declare module '*.svg' {
  const filePath: string

  export default filePath
}

declare module './shared/useFetch';