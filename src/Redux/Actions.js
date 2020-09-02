import {axiosWithAuth} from '../Utils/AxiosWithAuth'
export const ADDSONG="ADDSONG", REMOVESONG="REMOVESONG", ADDTOROUTE="ADDTOROUTE", STARTROUTE="STARTROUTE", CHANGEROUTE = "CHANGEROUTE",
SEARCHSUCCESS="SEARCHSUCCESS", SEARCHFAIL="SEARCHFAIL"

export function add(song) {
  return dispatch => {
    dispatch({ type: ADDSONG, payload: song })
  }
}

export function startRoute(waypoint){
  return dispatch => {
    dispatch({ type: STARTROUTE, payload: waypoint})
  }
}

export function addRoute(waypoint){
console.log(waypoint)
  return dispatch => {
    dispatch({ type: ADDTOROUTE, payload: waypoint})
  }
}


export function changeRoute(id, update){
  return dispatch => {
    dispatch({ type: CHANGEROUTE, payload: {id, update}})
  }
}

export const search = (searches, type) =>{
  axiosWithAuth().get(`/search?q=${searches}&type=${type}`)
  .then(res => {
    return ({type: SEARCHSUCCESS, payload: res})
  })
  .catch(err => {
    return ({type: SEARCHFAIL, payload: err})
  })

}