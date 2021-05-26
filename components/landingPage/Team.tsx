const Team = (): JSX.Element => {
  return (
    <section>
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Team</h1>
      <div className="md:flex justify-center gap-10">
        <div className="text-center mb-8 md:mb-0 ">
          <img
            className="object-cover w-48 h-48 rounded-full mx-auto -mb-24"
            src="https://github.com/AY2021S2-CS2103T-T12-4/tp/blob/master/docs/images/tlylt.png?raw=true"
            alt="Liu Yongliang"
          />
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-32 pb-10 text-gray-400">
            <h3 className="font-title dark:text-gray-100 text-gray-800 text-xl mb-3">
              Liu Yongliang
            </h3>
            <p className="font-body">Developer</p>
            {/* <p className="font-body text-sm mb-4">Half Dreaming & Half Sleeping</p>
            <a
              className="font-body text-blue-500 hover:text-gray-800"
              href="mailto:notawakestudio@gmail.com">
              notawakestudio@gmail.com
            </a> */}
          </div>
        </div>
        <div className="text-center">
          <img
            className="object-cover w-48 h-48 rounded-full mx-auto -mb-24"
            src="https://github.com/AY2021S2-CS2103T-T12-4/tp/blob/master/docs/images/ong6.png?raw=true"
            alt="Ong Jun Xiong"
          />
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 pt-32 pb-10 text-gray-400">
            <h3 className="font-title dark:text-gray-100 text-gray-800 text-xl mb-3">
              Ong Jun Xiong
            </h3>
            <p className="font-body">Developer</p>
            {/* <p className="font-body text-sm mb-4">Half Dreaming & Half Sleeping</p>
            <a
              className="font-body text-blue-500 hover:text-gray-800"
              href="mailto:notawakestudio@gmail.com">
              notawakestudio@gmail.com
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
