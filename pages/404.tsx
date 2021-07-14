import Head from 'next/head'
export default function Custom404(): JSX.Element {
  return (
    <section>
      <Head>
        <title>404 Not Found | NUS Connect</title>
        <meta name="description" content="404 Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" text-white">
        <div className="h-screen flex flex-col justify-center items-start ">
          <img src="/peekCat.jpg" alt="404 Error" />
          <p className="text-sm md:text-base text-black p-2 mb-4">
            The stuff you were looking for doesn&apos;t exist!
          </p>
          <a
            href="/"
            className="bg-transparent hover:bg-black text-black hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-black dark:bg-black hover:border-transparent dark:text-white dark:hover:bg-white dark:hover:text-black">
            Go Back
          </a>
        </div>
      </div>
    </section>
  )
}
