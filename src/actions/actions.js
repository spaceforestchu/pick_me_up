import constants from '../constants/constants';
import { APIManager } from '../utils';

export default {
  zonesReceived: (zones) => {
    return {
      type: constants.ZONES_RECEIVED,
      zones: zones
    }
  },

  zoneCreated: (zone) => {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    }
  },

  selectZone: (index) => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    }
  },

  commentsReceived: (comments, zone) => {
    return {
      type: constants.COMMENTS_RECEIEVED,
      comments: comments,
      zone: zone
    }
  },

  commentCreated: (comment) => {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    }
  },

  currentUserReceived: (user) => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    }
  },

  fetchProfile: (params) => {
    console.log("params" + JSON.stringify(params));
    return (dispatch) => {

      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading'
      });


      APIManager
        .get('/api/profile', params, (err, response) => {
          if (err) {
            console.log('ERROR: ' + err);
            return;
          }
          //console.log("64" + JSON.stringify(response));
          if (response.results.length == 0) {
            console.log('Profile Not Found.');
            return;
          }
          const profile = response.results[0];
          dispatch({
            type: constants.PROFILE_RECEIVED,
            profile: profile,
            reducer: 'profile'
          });
        });
    }
  },

  fetchZones: (params) => {
    return (dispatch) => {

      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading'
      });

      APIManager.get('/api/zone', params, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        const zones = response.results;


        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: zones,
          reducer: 'zone'
        });

      });
    }
  },

  updateProfile: (profile, updated) => {
    return (dispatch) => {

      const endpoint = '/api/profile/' + profile._id;

      APIManager.put(endpoint, updated, (err, response) => {
        if (err) {
          console.log('ERROR: ' + JSON.stringify(err));
          return;
        }
        const updatedProfile = response.result;
        dispatch({
          type: constants.PROFILED_UPDATED,
          profile: updatedProfile
        })
        //console.log(JSON.stringify(response));
      });
    }
  },

  updateComment: (comment, params) => {
    return (dispatch) => {
      const endpoint = '/api/comment/' + comment._id;
      APIManager.put(endpoint, params, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(response));
        const updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    }
  },

  fetchComments: (params) => {
    return (dispatch) => {
      APIManager.get('/api/comment', params, (err, response) => {
        if (err) {
            alert(err);
            return;
        }
        console.log(JSON.stringify(response));
        const comments = response.results;
        dispatch({
          type: constants.COMMENTS_RECEIEVED,
          comments: comments
        })
      })
    }
  }

}
