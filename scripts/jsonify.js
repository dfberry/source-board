

const user= {
    githubId: '',
    username: '',
    id: ''
  }
  
const session= {
    id: '',
    userId: '',
    fresh: false,
    expiresAt: "2024-09-18T02:23:21.637Z"
  }

const userJson= JSON.stringify(user)
const sessionJson= JSON.stringify(session)

console.log(userJson)
console.log(sessionJson)