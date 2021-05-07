export const shuffleStringArray = (array: string[]): string[] => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const hasSameContent = (arrayA: string[], arrayB: string[]): boolean => {
  if (arrayA.length != arrayB.length) {
    return false
  } else {
    return arrayA.filter((x) => arrayB.includes(x)).length === arrayA.length
  }
}
