import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { act } from "react-dom/test-utils"
import Footer from '../components/common/Footer'
import LikeButton from '../components/common/LikeButton'
import QuickLink from '../components/common/QuickLink'
import TagBar from '../components/common/TagBar'
import Avatar from '../components/profile/Avatar'
import Badges from '../components/profile/Badges'
import DisplayName from '../components/profile/DisplayName'
import ProfileHeader from '../components/profile/ProfileHeader'
import { UserProvider } from '../components/store/user'
import Custom404 from '../pages/404'
import Home from '../pages/index'
import Login from '../pages/login'

jest.mock('next-auth/client')

const fakeUser = {
  displayName: "fakeName",
  profilePicUrl: "/cat.jpg",
  modules:
    [
      {
        "badges": [
          "ngtbhPgKtHLClT4WdXT9N"
        ],
        "exp": 20,
        "id": "CS2030/S",
        "quest": null,
        "quiz": null
      }
    ]
}

jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeUser)
  })
);

useSession.mockReturnValue([
  {
    expires: '1',
    user: { email: 'a', name: 'Delta', image: 'c' },
  },
  false,
])

describe('Page level components render successfully', () => {
  it('renders Home', () => {
    render(<Home />)
    expect(screen.getByText('Explore Now')).toBeInTheDocument()
  })
  it('renders 404', () => {
    render(<Custom404 />)
  })
  it('renders Login', () => {
    render(<Login />)
    expect(screen.getByText('You are logged in as Delta')).toBeInTheDocument()
  })

})

describe('Component level components render successfully', () => {
  it('renders Badges', () => {
    act(() => { render(<Badges user={fakeUser} isLoaded={false} />) })
    expect(screen.getByText('Your badges')).toBeInTheDocument()
  })
  it('renders Avatar', async () => {
    await act(async () => {
      render(<Avatar author_id="fake" />)
    })
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
  it('renders DisplayName', async () => {
    await act(async () => {
      render(<DisplayName author_id="fake" />)
    })
    expect(screen.getByText('fakeName')).toBeInTheDocument()
  })
  it('renders ProfileHeader', async () => {
    await act(async () => {
      render(<UserProvider><ProfileHeader /></UserProvider>)
    })
    expect(screen.getByText('fakeName')).toBeInTheDocument()
  })

})

describe('Common components render successfully', () => {
  it('renders Footer', () => {
    render(<Footer />)
    expect(screen.getByText('Github')).toBeInTheDocument()
  })
  it('renders LikeButton', async () => {
    render(<LikeButton likeCount={100} />)
    expect(screen.getByText(100)).toBeInTheDocument()
  })
  it('renders QuickLink', async () => {
    render(<QuickLink />)
    expect(screen.getByText('NUSMOD')).toBeInTheDocument()
  })
  it('renders TagBar', async () => {
    render(<TagBar currentTag="Question" />)
    expect(screen.getByText('Question')).toBeInTheDocument()
  })
})
