import http from "../utils/http"
const base = import.meta.env.VITE_APP_RUTA_API || "http://127.0.0.1:3000/api"
const endPoint = `${base}/stores`

const getAll = (options) => {
  return new Promise((resolve, reject) => {
    http.get({
      url: endPoint,
      ...options,
    })
    .then(res => resolve(res))
    .catch(res => reject(res))
  })
}

const getOne = (id, options) => {
  return new Promise((resolve, reject) => {
    http.get({
      url: `${endPoint}/${id}`,
      ...options,
    })
    .then(res => resolve(res))
    .catch(res => reject(res))
  })
}

const post = (options) => {
  return new Promise((resolve, reject) => {
    http.post({
      url: endPoint,
      ...options,
    })
    .then(res => resolve(res))
    .catch(res => reject(res))
  })
}

const put = (id, options) => {
  return new Promise((resolve, reject) => {
    http.put({
      url: `${endPoint}/${id}`,
      ...options,
    })
    .then(res => resolve(res))
    .catch(res => reject(res))
  })
}

const remove = (id, options) => {
  return new Promise((resolve, reject) => {
    http.delete({
      url: `${endPoint}/${id}`,
      ...options,
    })
      .then(res => resolve(res))
      .catch(res => reject(res))
  })
}

export default {
  getAll,
  getOne,
  post,
  put,
  delete: remove
}