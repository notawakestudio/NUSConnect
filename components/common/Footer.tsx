import Link from 'next/link'

const Footer = (): JSX.Element => {
  return (
    <footer
      className="bg-white dark:bg-gray-900 w-full py-8 border-t border-gray-200"
      suppressHydrationWarning={true}>
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
          <li className="m-2">
            <Link href="https://notawakestudio.github.io/NUSConnect-Docs/UserGuide#frequently-asked-questions-faq">
              <a
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                rel="noreferrer">
                FAQ
              </a>
            </Link>
          </li>
          <li className="m-2">
            <Link href="/">
              <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                About
              </a>
            </Link>
          </li>
          <li className="m-2">
            <Link href="https://github.com/notawakestudio/NUSConnect">
              <a
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                rel="noreferrer">
                Github
              </a>
            </Link>
          </li>
          <li className="m-2">
            <Link href="https://notawakestudio.github.io/NUSConnect-Docs/">
              <a
                target="_blank"
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                rel="noreferrer">
                Documentation
              </a>
            </Link>
          </li>
          <li className="m-2">
            <Link href="/">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer">
                Powered by NotAwakeStudio
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
