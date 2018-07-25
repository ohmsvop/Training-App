const recordsReducerDefaultState = [];

const recordsReducer = (state = recordsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return [
        ...state,
        action.record
      ];
    // case 'REMOVE_RECORD':
    //   return state.filter(({ id }) => id !== action.id);
    // case 'EDIT_RECORD':
    //   return state.map((record) => {
    //     if (record.id === action.id) {
    //       return {
    //         ...record,
    //         ...action.updates
    //       };
    //     } else {
    //       return record;
    //     }
    //   });
    // case 'SET_RECORDS':
    //   return action.records;
    default:
      return state;
  }
};

export default recordsReducer;