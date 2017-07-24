export default {

  thumbnail: (url, dimen) => {
    let thumbParams = `upload/c_thumb,h_${dimen},q_100,r_99,w_${dimen},x_0,y_0/a_0`;
    let dynamic = url.replace('upload', thumbParams);
    return dynamic;
  },

  commentNail: (url) => {
    return url.replace('upload', 'upload/c_limit,h_100,w_100')
  }

}
