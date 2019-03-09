const initialState = {
  id: 0,
  username: '',
  profile_pic: '',
  email: '',
  isLoggedIn: false,
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'
const CREATE_POST = 'CREATE_POST'

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  }
}

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      const { id, username, email } = payload
      return {...state, id, username, email, isLoggedIn:true}
    case CLEAR_USER:
      return {...state, id:0, username:'', email: '', isLoggedIn: false}
    default: 
      return state;
  }
}