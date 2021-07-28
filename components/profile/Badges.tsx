import { Divider, Skeleton } from '@chakra-ui/react'
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
import { useCurrentModule } from '../store/module'
import { User } from './UserAPI'

export type Badge = {
  id: string
  title: string
  description: string
  icon: () => JSX.Element
}

export const allBadges: Badge[] = [
  {
    id: 'ngtbhPgKtHLClT4WdXT9N',
    title: 'Welcome',
    description: 'Create and setup your account!',
    icon: function icon(): JSX.Element {
      return (
        <GiAchievement className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'QQxOX_Ajt51_rfa952BTQ',
    title: 'Smart',
    description: 'Answer 1 quiz question correctly!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: '0fpBjCwd7tvr5R4HhygWr',
    title: 'Smart',
    description: 'Answer 10 quiz questions correctly!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'UII8XXW1moC1OSANXAqIn',
    title: 'Smart',
    description: 'Answer 100 quiz questions correctly!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DGlasses className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: '6ZVNTqzE8NjHN0vfYAI_X',
    title: 'Strong',
    description: 'Complete 1 quiz!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: 'VXES2R6L7N7PIiLu1KNEO',
    title: 'Strong',
    description: 'Complete 10 quizzes!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'IdONfjYukVWuA3BZNNaXX',
    title: 'Strong',
    description: 'Complete 100 quizzes!',
    icon: function icon(): JSX.Element {
      return (
        <Gi3DHammer className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: '_LkrH3KbBF2FQZ7AxLd2-',
    title: 'Math',
    description: 'Unknown!',
    icon: function icon(): JSX.Element {
      return (
        <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: 'jDiqza42DF59aDmOXrkqV',
    title: 'Math',
    description: 'Unknown!',
    icon: function icon(): JSX.Element {
      return (
        <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'TAIq7dNsPqMqIavWsuV6g',
    title: 'Math',
    description: 'Unknown!',
    icon: function icon(): JSX.Element {
      return (
        <GiAbacus className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'ryB3xsuIQQhn49ZedpQd1',
    title: 'Achilles Heel',
    description: 'Get 1 question wrong!',
    icon: function icon(): JSX.Element {
      return (
        <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: '9T4T_9K8K2XgJ1nLvHJcI',
    title: 'Achilles Heel',
    description: 'Get 10 questions wrong!',
    icon: function icon(): JSX.Element {
      return (
        <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'I2Pmd48rYFtnDizKASaX3',
    title: 'Achilles Heel',
    description: 'Get 100 questions wrong!',
    icon: function icon(): JSX.Element {
      return (
        <GiAchillesHeel className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'vSNM-sWvxUjDIaAYfmXGw',
    title: 'Ace',
    description: 'Get full marks for a quiz 1 time!',
    icon: function icon(): JSX.Element {
      return (
        <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: 'XrwNb_UlFEAS8brwkuQex',
    title: 'Ace',
    description: 'Get full marks for a quiz 10 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: '50f-hKoRaYPohCdCU_Df3',
    title: 'Ace',
    description: 'Get full marks for a quiz 100 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAce className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'zpgNYEuAl_nmhmxoI4QDQ',
    title: 'Community',
    description: 'Make 1 forum post!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: '084B5J-Kv3Q6G5QriZuTY',
    title: 'Community',
    description: 'Make 10 forum posts!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'ohKy_-gIAjH_vTrvmMAOX',
    title: 'Community',
    description: 'Make 100 forum posts!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirBalloon className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'Fixv0kY-oq4pe-yu63-bz',
    title: 'Takeoff',
    description: 'Reply a post 1 time!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: 'dmlx2yxQo2NLOFz_qcxN6',
    title: 'Takeoff',
    description: 'Reply a post 10 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'Ixo-HRs2tVfkw9gPNFHRz',
    title: 'Takeoff',
    description: 'Reply a post 100 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAirplaneDeparture className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
  {
    id: 'ozIXuiMd4dEEheO7eiHV3',
    title: 'Speed',
    description: 'Be the first to reply a post 1 time!',
    icon: function icon(): JSX.Element {
      return (
        <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-700" />
      )
    },
  },
  {
    id: 'iGN2ybKH3jLz7prq5h8c9',
    title: 'Speed',
    description: 'Be the first to reply a post 10 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-gray-200" />
      )
    },
  },
  {
    id: 'lVhxyj0_R3_El8T-m7QWn',
    title: 'Speed',
    description: 'Be the first to reply a post 100 times!',
    icon: function icon(): JSX.Element {
      return (
        <GiAlarmClock className="self-center border rounded-full border-black w-10 h-10 p-1 bg-yellow-300" />
      )
    },
  },
]
export default function Badges({
  user,
  isLoading,
}: {
  user: User
  isLoading: boolean
}): JSX.Element {
  const { state: module } = useCurrentModule()
  return (
    <div className="dark:text-gray-400">
      <h1 className="text-center text-lg font-semibold mt-2">Your badges</h1>
      <div className="p-10 flex space-4 flex-wrap justify-center">
        {isLoading ? (
          <Skeleton height="300px" />
        ) : (
          user.modules
            .filter((mod) => mod.id === module.moduleId)[0]
            ?.badges.map((badgeId, index) => {
              const currBadge = allBadges.filter((curr) => curr.id === badgeId)[0]
              return (
                <div className="flex flex-col text-center m-4 w-36" key={index}>
                  <div className="flex flex-row justify-center space-x-2">{currBadge.icon()}</div>
                  <b data-cy={currBadge.title}>{currBadge.title} Badge</b>
                </div>
              )
            })
        )}
      </div>
      <Divider />
      <h1 className="text-center text-lg font-semibold">Available badges</h1>
      <p className="text-center text-xs italic">
        P.S. Some badges are only given as a quest reward
      </p>
      <div className="p-10 flex space-4 flex-wrap justify-center">
        {allBadges.map((badge, index) => {
          return (
            <div className="flex flex-col text-center m-4 w-36" key={index}>
              <div className="flex flex-row justify-center space-x-2">{badge.icon()}</div>
              <b data-cy={badge.title}>{badge.title} Badge</b>
              {badge.description}
            </div>
          )
        })}
      </div>
    </div>
  )
}
