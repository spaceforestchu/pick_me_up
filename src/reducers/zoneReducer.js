import constants from '../constants/constants';

var initialState = {
  list: [],
  selectedZone: 0,
  appStatus: 'ready'
}

export default (state=initialState, action) => {
  var updatedState = Object.assign({}, state);
  switch (action.type) {
    case constants.ZONES_RECEIVED:
      updatedState['list'] = action.zones;
      //console.log('ZONES_RECEIVED:', JSON.stringify(updatedState));
      updatedState['appStatus'] = 'ready';
      return updatedState;
    case constants.ZONE_CREATED:
      //console.log('ZONE_CREATED:', JSON.stringify(action.zone));
      let updatedList = Object.assign([], updatedState.list);
      updatedList.push(action.zone);
      updatedState['list'] = updatedList;
      return updatedState;

    case constants.SELECT_ZONE:
      //console.log(JSON.stringify(action.selectedZone));
      updatedState['selectedZone'] = action.selectedZone;
      return updatedState

    case constants.APPLICATION_STATE:

    if (action.reducer != 'zone') {
      return updatedState;
    }

      updatedState['appStatus'] = action.status
      return updatedState;
    default:
      return state;
  }
}
