import {api, serverUrl} from './api';
export const REQUEST_DASHBOARDS = 'REQUEST_DASHBOARDS';
export const RECEIVE_DASHBOARDS = 'RECEIVE_DASHBOARDS';
export const ERROR_DASHBOARDS = 'ERROR_DASHBOARDS';

function requestDashboards() {
    return {
        type: REQUEST_DASHBOARDS,
    }
}

function receiveDashboards(json) {
    return {
        type: RECEIVE_DASHBOARDS,
        posts: json.dashboards,
    }
}

function fetchDashboards() {
    return dispatch => {
        dispatch(requestDashboards());
        const data = {dashboards: undefined};
        return api('GET', `${serverUrl}/api/v1/dashboard/`, data)
            .then(response => response.json())
            .then(json => dispatch(receiveDashboards(json)));
    }
}

function shouldFetchDashboards(state) {
  const dashboards = state.dashboards;
  if (!dashboards) {
    return true
  } else if (dashboards.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchDasboardsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchDashboards(getState())) {
      return dispatch(fetchDashboards())
    }
  }
}
// Example
// export const REQUEST_POSTS = 'REQUEST_POSTS';
// export const RECEIVE_POSTS = 'RECEIVE_POSTS';
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
//
// export function selectSubreddit(subreddit) {
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit
//   }
// }
//
// export function invalidateSubreddit(subreddit) {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit
//   }
// }
//
// function requestPosts(subreddit) {
//   return {
//     type: REQUEST_POSTS,
//     subreddit
//   }
// }
//
// function receivePosts(subreddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     subreddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }
//
// function fetchPosts(subreddit) {
//   return dispatch => {
//     dispatch(requestPosts(subreddit))
//     return fetch(`http://www.reddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }
//
// function shouldFetchPosts(state, subreddit) {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }
//
// export function fetchPostsIfNeeded(subreddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       return dispatch(fetchPosts(subreddit))
//     }
//   }
// }