import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { signUpAPI } from "../utils/fetchFromAPI";

const SignUp = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Full name</label>
          <input className="form-control" id="fullName" />
        </div>
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
            let txtFullName= document.querySelector("#fullName").value
            let txtEmail=document.querySelector("#email").value
            let txtPassword=document.querySelector("#pass").value

            let model = {
              fullName: txtFullName,
              email: txtEmail,
              password: txtPassword
            }

            signUpAPI(model).then(result => {
              alert(result.message)
            }).catch(error => {
              alert(error.message)
            })
          }}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
};

export default SignUp;