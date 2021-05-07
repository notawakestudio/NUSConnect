export const shuffleArray = (array: any[]): any[] => {
  return [...array].sort(() => Math.random() - 0.5)
}
