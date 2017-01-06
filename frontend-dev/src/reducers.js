import { combineReducers } from 'redux'
import {
  REQUEST_DASHBOARDS, RECEIVE_DASHBOARDS, ERROR_DASHBOARDS
} from './actions'

// Error not handled
function dashboards(state = {
  isFetching: false,
  didInvalidate: false,
  dashboards: {}
}, action) {
  switch (action.type) {
    case REQUEST_DASHBOARDS:
      return Object.assign({}, state, {
        isFetching: true,
        ApiError: false
      });
    case RECEIVE_DASHBOARDS:
      return Object.assign({}, state, {
        isFetching: false,
        ApiError: false,
        dashboards: action.dashboards,
      });
    case ERROR_DASHBOARDS:
       return Object.assign({}, state, {
        ApiError: true
      });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dashboards,
});

export default rootReducer

// import { combineReducers } from 'redux'
// import {
//   SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from './actions'
//
// function selectedSubreddit(state = 'reactjs', action) {
//   switch (action.type) {
//   case SELECT_SUBREDDIT:
//     return action.subreddit
//   default:
//     return state
//   }
// }
//
// function posts(state = {
//   isFetching: false,
//   didInvalidate: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_POSTS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }
//
// function postsBySubreddit(state = { }, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }
//
// const rootReducer = combineReducers({
//   postsBySubreddit,
//   selectedSubreddit
// })
//
// export default rootReducer