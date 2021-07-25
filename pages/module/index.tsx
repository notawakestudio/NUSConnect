import { Button, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import {
  addUserToModule,
  removeUserFromModule,
  useAllModules,
} from '../../components/module/ModuleAPI'
import { useUser } from '../../components/profile/UserAPI'
import { useUserId } from '../../components/store/user'

export default function Home(): JSX.Element {
  const router = useRouter()
  const { modules, isLoading } = useAllModules()
  const userId = useUserId()
  const toast = useToast()

  const { user, isLoading: userLoading } = useUser()
  const role = userLoading ? 'student' : user.role
  return (
    <>
      <Head>
        <title>Modules | NUS Connect</title>
        <meta name="description" content="NUS Connect" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-12 md:pt-2 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full rounded min-h-screen">
        <div className="rounded-t mb-0 px-0 border-0">
          <div className="flex flex-wrap items-center px-4 py-2">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                Existing Modules
              </h3>
              <p className="text-xs italic">
                P.S. For the purpose of showcasing mudule switching functionality for Orbital, the
                following modules will still be available even if you "quit" the module.
              </p>
            </div>
            {role === 'admin' ? (
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => router.push('module/new-module')}
                  type="button">
                  Create new module
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Module
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Semester
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Professor
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Number of Students
                  </th>
                  <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  modules.map((module) => (
                    <tr className="text-gray-700 dark:text-gray-100" key={module.id}>
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {module.title}
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        2021/2022 Sem 1
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        Prof X
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{module.users.length}</span>
                        </div>
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {module.users.includes(userId) ? (
                          <Button
                            className="dark:text-black"
                            onClick={() => {
                              removeUserFromModule(module.id, userId)
                              toast({
                                title: 'Removed module from account.',
                                position: 'top-right',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              })
                            }}>
                            Quit
                          </Button>
                        ) : (
                          <Button
                            className="dark:text-black"
                            onClick={() => {
                              addUserToModule(module.id, userId)
                              toast({
                                title: 'Added module to account.',
                                position: 'top-right',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              })
                            }}>
                            Join
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
