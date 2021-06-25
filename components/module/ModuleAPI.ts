const API_MAKE_MODULE = 'https://1ieznu.deta.dev/module/make'
// const API_GET_ALL_MODULE = 'https://1ieznu.deta.dev/module/'

export function makeModule(module): void {
  const requestBody = {
    id: module['id'],
    title: module['title'],
    users: module['users'],
    questions: [],
    quiz: [],
    forum: [],
    reply: [],
    tasks: [],
    schedule: [],
  }

  fetch(API_MAKE_MODULE, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
  }).then((response) => {
    console.log(response)
  })
}
