import ModuleData from '../../public/data/ModuleData.json'

export type Task = {
  id: string
  description: string
}
export type Weekly = {
  id: string
  week: string
  tasks: Task[]
}

export const fetchModuleData = (moduleId: string): Weekly[] => {
  return ModuleData.filter((module) => module['id'] === moduleId)[0]['schedule']
}

export const fetchModuleTitle = (moduleId: string): string => {
  return ModuleData.filter((module) => module['id'] === moduleId)[0]['title']
}
