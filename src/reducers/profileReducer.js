import constants from '../constants/constants';

var initialState = {
  list: [],
  map: {},
  appStatus: 'ready'
}

export default (state=initialState, action) => {
  var updatedState = Object.assign({}, state);
  switch (action.type) {
    case constants.PROFILE_RECEIVED:
      console.log('JSON.stringify:', JSON.stringify(action.profile));
      let updatedMap = Object.assign({}, state.map);
      updatedMap[action.profile.username] = action.profile;
      updatedState['map'] = updatedMap;

      updatedState['appStatus'] = 'ready';

      return updatedState;

    case constants.APPLICATION_STATE:
      console.log(JSON.stringify(action.status));

      if (action.reducer != 'profile') {
        return updatedState;
      }

      updatedState['appStatus'] = action.status;
      return updatedState;
    default:
      return state;
  }
}
