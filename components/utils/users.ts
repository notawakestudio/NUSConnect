import { firestore } from './firebase'

const getAccounts = async () => {
  const snapshot = await firestore.collection('accounts').get()
  snapshot.docs.forEach((doc) => console.log(doc.data()))
}

const getUsers = async () => {
  const snapshot = await firestore.collection('users').get()
  snapshot.docs.forEach((doc) => console.log(doc.data()))
}

export { getUsers, getAccounts }
