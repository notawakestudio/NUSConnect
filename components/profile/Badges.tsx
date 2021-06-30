import {
  Gi3DGlasses,
  Gi3DHammer,
  GiAbacus,
  GiAce,
  GiAchievement,
  GiAchillesHeel,
  GiAirBalloon,
  GiAirplaneDeparture,
  GiAlarmClock,
} from 'react-icons/gi'

export default function Badges(): JSX.Element {
  return (
    <div className="p-10 flex flex-col space-4 flex-wrap">
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAchievement className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Welcome Badge</b>Create and setup your account!
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Smart Badge</b>Answer 1 | 10 | 100 quiz question correctly
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200  " />
          <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Strong Badge</b>Complete 1 | 10 | 100 questions
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200  " />
          <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Math Badge</b> Unknown :)
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200  " />
          <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Achilles Heel Badge</b>Get 1 | 10 | 100 questions wrong
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Ace Badge</b>Get full marks for a quiz 1 | 10 | 100 times
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Community Badge</b>Make 1 | 10 | 100 forum posts
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Takeoff Badge</b>Reply a post 1 | 10 | 100 times
      </div>
      <div className="flex flex-col text-center m-4">
        <div className="flex flex-row justify-center space-x-2">
          <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        <b>Speed Badge</b>Be the first to reply a post 1 | 10 | 100 times
      </div>
    </div>
  )
}
