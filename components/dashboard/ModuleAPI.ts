import ModuleData from '../../public/data/ModuleData.json'

export type Task = {
  id: string
  description: string
  link: string
  exp: number
}
export type Weekly = {
  id: string
  week: string
  announcement: string
  tasks: Task[]
}

export const fetchModuleData = (moduleId: string): Weekly[] => {
  return ModuleData.filter((module) => module['id'] === moduleId)[0]['schedule']
}

export const fetchModuleTitle = (moduleId: string): string => {
  return ModuleData.filter((module) => module['id'] === moduleId)[0]['title']
}
