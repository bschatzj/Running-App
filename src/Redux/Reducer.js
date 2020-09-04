import { ADDSONG, REORDER, REMOVESONG, STARTROUTE, ADDTOROUTE, CHANGEROUTE, SEARCHSUCCESS, SEARCHING } from './Actions'
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  playList: [],
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
        playList: arrayMove(state.playList, action.payload.oldIndex, action.payload.newIndex)
      }
    default:
      return state
  }
}