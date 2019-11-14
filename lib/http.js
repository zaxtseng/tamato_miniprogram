const { host, t_app_id, t_app_secret} = getApp().globalData
function _http(method,url,data){
  // let header = {
  //   Authorization: `Bearer ${wx.getStorageSync('X-token')}`,
  //   "t-app-id": t_app_id,
  //   "t-app-secret": t_app_secret
  // }
  // if (wx.getStorageSync('X-token')){
  //   header["Authorization"] = `Bearer ${wx.getStorageSync('X-token')}`
  // }
  return new Promise((resolve,reject)=>{
    wx.request({
      data,
      method,
      url: `${host}${url}`,
      header:  {
        Authorization: `Bearer ${wx.getStorageSync('X-token')}`,
        "t-app-id": t_app_id,
        "t-app-secret": t_app_secret
      },
      dataType: 'json',
      success: function(response) {
        let statusCode = response.statusCode
        if (statusCode > 400){
          if (statusCode === 401){
            wx.redirectTo({ url: "/pages/login/login" })
          }
          reject({ statusCode, response })
        } else {
          resolve(response)
        }
      },
      fail: function(errors){
        wx.showToast({ title: '请求失败'})
        reject(errors)
      }
    })
  })
}

const http = {
  get: (url, params) => _http('GET', url, params),
  post: (url, data) => _http('POST',url, data),
  put: (url,data) =>  _http('PUT',url, data),
  delete: (url, data) =>  _http('PUT', url, data) 
}

export default {
  http
}
// module.exports = {
//   http
// }