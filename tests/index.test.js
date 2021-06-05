import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import Custom404 from '../pages/404'
import { useSession } from 'next-auth/client'

jest.mock('next-auth/client')

useSession.mockReturnValue([
  {
    expires: '1',
    user: { email: 'a', name: 'Delta', image: 'c' },
  },
  false,
])

describe('Home', () => {
  it('renders Home without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Explore Now')).toBeInTheDocument()
  })
  it('renders 404 without crashing', () => {
    render(<Custom404 />)
  })
})
