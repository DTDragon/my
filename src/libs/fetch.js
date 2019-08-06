import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { $http } from 'vux/src/plugins/ajax';
import { resolve } from 'url';
import  { ToastPlugin, LoadingPlugin  } from 'vux'
import _ from 'lodash'

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

// axios 配置
$http.defaults.timeout = 600000
// axios.defaults.withCredentials = true
$http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
$http.defaults.withCredentials = true;
$http.defaults.xsrfCookieName = "CSRF-TOKEN";
$http.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
$http.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

function _buildRestApi(url, data) {
    for (let field in data) {
        if (url.includes(`{${field}}`)) {
            url = url.replace(`{${field}}`, data[field])
            delete data[field]
        }
    }
    return url
}

function _buildQueryUrl(url, data) {
    if (data['include']) {
        url += url.includes('?') ? '&' : '?';
        url += `include=${data['include']}`
        delete data['include']
    }
    if (data['exclude']) {
        url += url.includes('?') ? '&' : '?';
        url += `exclude=${data['exclude']}`
        delete data['exclude']
    }
    if (data['ksmquestionid']) {
        url += url.includes('?') ? '&' : '?';
        url += `questionId=${data['ksmquestionid']}`
        delete data['ksmquestionid']
    }
    if (data['VerifyCode']) {
        url += url.includes('?') ? '&' : '?';
        url += `VerifyCode=${data['VerifyCode']}`
        delete data['VerifyCode']
    }
    return url
}
function _removeQueryParams(url) {
    var index = url.indexOf('?')
    if (index >= 0) {
        return url.substr(0, url.indexOf('?'));
    } else {
        return url;
    }
}

function _errorHandler (res) {
    if (res.data.errorCode) {
        let msg = "抱歉出了点问题, 请稍后再试!"
        if (res.data.message) {
            msg = res.data.message;
        } else if (res.data.msg) {
            msg = res.data.msg;
        }
        Vue.$vux.toast.text(msg, "center");
    }    
}

function _buildCapchas(response) {
    var uri = (response.config.method + ":" + _removeQueryParams(response.config.url)).toLowerCase();
    if (response.headers.capcha == '1' || response.headers.capcha == 1) {
        Vue.set(fetch.capchas, uri, true);
    } else {
        Vue.set(fetch.capchas, uri, false);
    }
}

$http.interceptors.response.use(function (response) {
    if (!process.server) {
        _buildCapchas(response)
    }
    if (response.config && response.config.dealMessage) {
        //不需要统一处理报错的接口
    } else {
        if (response.data && response.data.errorCode && response.data.errorCode !== 200) {
            //  _handleError(response.data.errorCode, response.data.message)
        }
    }
    return response;
}, function (error) {
    // _handleError(error.response.status)
  //  return Promise.reject(util.inspect(error, { depth: null }));
});

const fetch = {
    capchas: new Array(),
    get: (url, originQueryData) => {
        let queryData = _.cloneDeep(originQueryData);
        url = _buildRestApi(url, queryData)
        return new Promise((resolve, reject) => {
            if (queryData && Object.keys(queryData).length > 0) {
                if (!url.includes('?')) {
                    url += '?'
                }
                else {
                    url += '&'
                }
                url += qs.stringify(queryData, {
                    skipNulls: true
                })
            }
            $http.get(url).then(res => {
                _errorHandler(res);
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

    post: (url, originData) => {
        let data = _.cloneDeep(originData);
        url = _buildRestApi(url, data)
        url = _buildQueryUrl(url, data)

        return new Promise((resolve, reject) => {
            $http.post(url, data).then(res => {
                _errorHandler(res);
                resolve(res.data)
            })
        })
    },

    put: (url, originData) => {
        let data = _.cloneDeep(originData);
        url = _buildRestApi(url, data)
        url = _buildQueryUrl(url, data)

        return new Promise((resolve, reject) => {
            $http.put(url, data).then(res => {
                _errorHandler(res);
                resolve(res.data)
            })
        })
    },

    delete: (url, originData) => {
        let data = _.cloneDeep(originData);
        url = _buildRestApi(url, data)
        url = _buildQueryUrl(url, data)

        return new Promise((resolve, reject) => {
            $http.delete(url, data).then(res => {
                _errorHandler(res);
                resolve(res.data)
            })
        })
    }

}

Vue.prototype.$fetch = fetch
export default fetch