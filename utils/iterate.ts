export const iterate = (length: number, callback: (index) => any) => {
  return Array.from({ length }).map((_, i) => callback(i))
}
