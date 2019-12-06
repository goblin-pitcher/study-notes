export const ADD_HOSPITAL = 'ADD_HOSPITAL';
export const ADD_DEPARTMENT = 'ADD_DEPARTMENT';

export function updateHospital(name) {
    return {
        type: ADD_HOSPITAL,
        name: name
    }
}

export function updateDepartment(name) {
    return {
        type: ADD_DEPARTMENT,
        name: name
    }
}