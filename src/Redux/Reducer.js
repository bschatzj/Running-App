import { ADDSONG, REORDER, REMOVESONG, STARTROUTE, ADDTOROUTE, CHANGEROUTE, SEARCHSUCCESS, SEARCHING, CREATEPLAYLIST, RUNLENGTH } from './Actions'
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  playList: [],
  playListTitle: "",
  playListID: "",
  route: {
    title: '',
    distance: 0,
    wayPoints: []
  },
  pace: 0,
  spotify: {},
  searching: false,
  searchComplete: false,
}

export function reducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {

    case ADDSONG:
      return {
        ...state,
        playList: [...state.playList, action.payload]
      };
    case STARTROUTE:
      return {
        ...state,
        route: {
          ...state.route,
          title: action.payload.title,
          wayPoints: [action.payload.waypoint]
        }
      }
    case ADDTOROUTE:
      return {
        ...state,
        route: {
          ...state.route,
          wayPoints: [...state.route.wayPoints, action.payload],
          distance: state.distance + action.payload.distance
        }
      }

    case CHANGEROUTE:
      return {
        ...state,
        route: {
          ...state.route,
          wayPoints: [...state.route.wayPoints.filter((point) => (point.id !== action.payload.id)), { 'id': action.payload.id, 'cords': action.payload.update }]
        }
      }

    case SEARCHSUCCESS:
      return {
        ...state,
        spotify: action.payload,
        searching: false,
        searchComplete: true,
      }

    case SEARCHING:
      return {
        ...state,
        searching: true
      }

    case REORDER:
      return {
        ...state,
        playList: action.payload
      }

    case CREATEPLAYLIST:
      console.log(action)
      return {
        ...state,
        playListTitle: action.payload.title,
        playListID: action.payload.id
      }

    case RUNLENGTH:
      return {
        ...state,
        route: {
          ...state.route,
          distance: action.payload
        }
      }
    default:
      return state
  }
}
