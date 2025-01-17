import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: { 
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'token': localStorage.getItem("LOGIN_USER")
  },
};



export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};




export const getVideoAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options)

  return data.data
}

export const getVideoTypeAPI = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`, options)

  return data.data
}

export const getVideoWithTypeAPI = async (typeId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-with-type/${typeId}`, options)

  return data.data
}



export const getVideoPageAPI = async (page) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`, options)

  return data.data // =>{listVideo, totalPage}
}

export const getVideoDetailAPI = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-detail/${videoId}`, options)

  return data.data 
}

export const signUpAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/sign-up/`, model, options)

  return data // {code, data, message, date}
}

export const logInAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login/`, model, options)

  return data // {code, data, message, date}
}

export const getCommentAPI = async (videoId) => {
  const { data } = await axios.get(`${BASE_URL}/video/get-comment/${videoId}`, options)

  return data.data 
}

export const commentAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/video/comment/`,model, options)
  
  return data.data 
}

export const logInFacebookAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login-facebook/`, model, options)

  return data // {code, data, message, date}
}

export const checkForgetEmailAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/forget-check-mail/`, model, options)

  return data // {code, data, message, date}
}

export const checkForgetCodeAPI = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/forget-check-code/`, model, options)

  return data // {code, data, message, date}
}

export const uploadCloudAPI = async (formData) => {
  const {data} = await axios.post(`https://api.cloudinary.com/v1_1/dg75orblp/upload`, formData, options)
  return data
}

export const uploadAvatarAPI = async (formData) => {
  const {data} = await axios.post(`${BASE_URL}/user/upload-avatar/`, formData)
  return data
}

//get API user
export const getUserAPI = async (formData) => {
  const data = await axios.get(`${BASE_URL}/user/get-all-user/`, options)
  return data.data
}

axios.interceptors.response.use(
  function (response) {


    return response;
  }
  ,
  function (error) {

    // console.log(error.response)
    if (error.response.status === 401 && error.response.data === "TokenExpiredError") {
      // API reste token
      axios.post(`${BASE_URL}/user/reset-token`, null, options).then(result => {

        localStorage.setItem("LOGIN_USER", result.data.data)
        window.location.reload()

      }).catch(error => {
        // logout 
      })

    }

    return Promise.reject(error);
  }
);