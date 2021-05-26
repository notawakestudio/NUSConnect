import { getSession } from 'next-auth/client'

export default async (req, res): Promise<void> => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      name: session.user.name,
      email: session.user.email ? session.user.email : '',
      image: session.user.image ? session.user.image : '',
    })
  } else {
    res.send({
      error: 'User not logged in',
    })
  }
}
