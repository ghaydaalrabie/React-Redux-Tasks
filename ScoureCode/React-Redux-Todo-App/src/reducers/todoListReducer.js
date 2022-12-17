const intialState = [{
    workName: 'Task 1',
}, {
    workName: 'Task 2',
}, {
    workName: 'Task 3',
}, {
    workName: 'Task 4',
}];

export default function (state = intialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            state.unshift(action.payload);
            return [...state];
        case 'DELETE_TODO':
            state.splice(action.payload, 1);
            return [...state];
        default:
            return state;
    }
}
