import SidebarBody from './SidebarBody'
import SidebarHeader from './SidebarHeader'

const SideBar = (): JSX.Element => {
  return (
    <div className="h-full hidden relative w-48 xl:w-56 lg:flex flex-col flex-auto flex-shrink-0 ">
      <div className="absolute flex flex-col to8p-18 left-0 w-48 xl:w-56 dark:bg-gray-900 h-full border-r-2 border-gray-200">
        <SidebarHeader />
        <SidebarBody />
      </div>
    </div>
  )
}

export default SideBar
