import {ADDSONG, REMOVESONG, STARTROUTE, ADDTOROUTE, CHANGEROUTE } from './Actions'


const initialState = {
    playList: [],
    route:{
      title: '',
      distance: 0,
      wayPoints: []
    }
}

export function reducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
      
    case ADDSONG:
    return{
        ...state,
        playList: [...state.playList, action.payload]
    };
    case STARTROUTE:
      return{
        ...state,
        route:{
          ...state.route,
          title: action.payload.title,
          wayPoints: [action.payload.waypoint]
        }
      }
    case ADDTOROUTE:
      return{
        ...state,
        route:{
          ...state.route,
          wayPoints: [...state.route.wayPoints, action.payload],
          distance: state.distance + action.payload.distance
        }
      }

    case CHANGEROUTE:
      return{
        ...state,
        route:{
          ...state.route,
          wayPoints: [...state.route.wayPoints.filter((point) => (point.id !== action.payload.id )), {'id':action.payload.id, 'cords': action.payload.update}]
        }
      }
   
    default:
      return state
  }
}
