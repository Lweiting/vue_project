import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

// get请求
export function getBalabce(params){
    return http.get(``,params)
}

// post请求
export function postFormAPI(params){
    return http.post(``,params)
}
// put 请求
export function putSomeAPI(params){
    return http.put(``,params)
}
// delete 请求
export function deleteListAPI(params){
    return http.delete(``,params)
}

