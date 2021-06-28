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
    <div className="p-10 flex space-x-2 flex-wrap">
      <div className="flex flex-col text-center space-y-2">
        <div className="flex flex-row justify-center space-x-2">
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
          <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
        </div>
        Smart Badge: answer 1,10,100 quiz question correct
        <div className="flex flex-col text-center">
          <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Strong Badge: complete 1,10,100 questions
        </div>
        <div className="flex flex-col text-center">
          <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Math badge:
        </div>
        <div className="flex flex-col text-center">
          <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Achilles Heel Badge: get 1,10,100 questions wrong
        </div>
        <div className="flex flex-col text-center">
          <GiAchievement className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Welcome Badge: Create and setup your account!
        </div>
        <div className="flex flex-col text-center">
          <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Ace Badge: get full marks for a quiz 1,10,100 times
        </div>
        <div className="flex flex-col text-center">
          <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Community Badge: make 1,10,100 forum posts
        </div>
        <div className="flex flex-col text-center">
          <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Takeoff Badge: reply a post 1,10,100 times
        </div>
        <div className="flex flex-col text-center">
          <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1" />
          Speed Badge: be the first to reply a post 1,10,100 times
        </div>
      </div>
    </div>
  )
}
