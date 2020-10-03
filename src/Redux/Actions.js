import axiosWithAuth from '../Utils/AxiosWithAuth'
export const ADDSONG = "ADDSONG", REMOVESONG = "REMOVESONG", ADDTOROUTE = "ADDTOROUTE", STARTROUTE = "STARTROUTE", CHANGEROUTE = "CHANGEROUTE",
  SEARCHSUCCESS = "SEARCHSUCCESS", SEARCHFAIL = "SEARCHFAIL", SEARCHING = "SEARCHING", REORDER = "REORDER", CREATEPLAYLIST = "CREATEPLAYLIST", RUNLENGTH = "RUNLENGTH"



export function createPlaylist(id, title) {
  console.log('hi')
  return dispatch => {
    dispatch({ type: CREATEPLAYLIST, payload: { id, title } })
  }
}


export function add(song) {
  return dispatch => {
    dispatch({ type: ADDSONG, payload: song })
  }
}

export function startRoute(waypoint) {
  return dispatch => {
    dispatch({ type: STARTROUTE, payload: waypoint })
  }
}

export function addRoute(waypoint) {
  console.log(waypoint)
  return dispatch => {
    dispatch({ type: ADDTOROUTE, payload: waypoint })
  }
}


export function changeRoute(id, update) {
  return dispatch => {
    dispatch({ type: CHANGEROUTE, payload: { id, update } })
  }
}

export function search(searches, type) {
  console.log('searched')
  return dispatch => {
    dispatch({ type: SEARCHING });
    axiosWithAuth().get(`/search?q=${searches}&type=${type}`)
      .then(res => {
        dispatch({ type: SEARCHSUCCESS, payload: res })
      })
  }
}

export function getArtist(url) {
  console.log('getting artist')
  return dispatch => {
    dispatch({ type: SEARCHING });
    axiosWithAuth().get(`/artists/${url}/top-tracks?country=from_token`)
      .then(res => {
        dispatch({ type: SEARCHSUCCESS, payload: res })
      })
  }
}


export function setRunLength(distance) {
  return dispatch => {
    dispatch({ type: RUNLENGTH, payload: distance })
  }
}



export function getAlbum(url) {
  console.log('getting album')
  return dispatch => {
    dispatch({ type: SEARCHING });
    axiosWithAuth().get(`/albums/${url}/tracks?country=from_token`)
      .then(res => {
        dispatch({ type: SEARCHSUCCESS, payload: res })
      })
  }
}

export function reorder(playlist) {
  return dispatch => {
    dispatch({ type: REORDER, payload: playlist })
  }
}