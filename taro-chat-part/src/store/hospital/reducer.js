import { ADD_HOSPITAL, ADD_DEPARTMENT } from './action'

const INITIAL_STATE = {
  hospitalName: '',
  departmentName: ''
}

export default function addHospital(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_HOSPITAL:
      return {
        ...state,
        hospitalName: action.name
      }
    case ADD_DEPARTMENT:
      return {
        ...state,
        departmentName: action.name
      }
    default:
      return state
  }
}

