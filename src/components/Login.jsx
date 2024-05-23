import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { logInAPI, logInFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";


const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary" onClick={() => {
            let txtEmail=document.querySelector("#email").value
            let txtPassword=document.querySelector("#pass").value

            let model = {
              email: txtEmail,
              password: txtPassword
            }

            logInAPI(model).then(result => {
              alert(result.message)
              localStorage.setItem("LOGIN_USER",result.data)
              window.location.reload()
            }).catch(error => {
              alert(error.response.data.message)
            })
          }}>Login</button>
          <a className='ms-3 text-primary' href="#" onClick={() => navigate('/forget')}>Forget password</a>
         
        </div>
        <ReactFacebookLogin
          appId="294077173741405"

          fields="name,email,picture"

          callback={(response) => {
            let model = {
              userID: response.userID,
              name: response.name,
              email: response.email
            }
            console.log(response)
            logInFacebookAPI(model).then(result => {
              alert("Login Thành Công")
              localStorage.setItem("LOGIN_USER",result.data)
              window.location.reload()
            })

        }} />
      </form>
    </div>
  </div>
};

export default Login;
