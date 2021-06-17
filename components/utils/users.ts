import { firestore } from './firebase'

const getAccounts = async () => {
  const snapshot = await firestore.collection('accounts').get()
  const accounts = snapshot.docs.map((doc) => doc.data())
  return accounts
}
const getUserId = async (sessionToken: string) => {
  const query = firestore.collection('sessions').where('accessToken', '==', sessionToken)
  let result: any
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      result = doc.data()
    })
  })
  return result['userId']
}
const getUsers = async () => {
  const snapshot = await firestore.collection('users').get()
  snapshot.docs.forEach((doc) => console.log(doc.data()))
}

export { getUsers, getAccounts, getUserId }
