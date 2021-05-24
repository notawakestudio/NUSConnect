import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({
      name: session.user.name,
      email: session.user.email ? session.user.email : 'empty',
      image: session.user.image ? session.user.image : 'empty',
    })
  } else {
    res.send({
      error: 'You need to be signed in.',
    })
  }
}
