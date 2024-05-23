import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { checkForgetCodeAPI, checkForgetEmailAPI, logInAPI, logInFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";


const Forget = () => {
  const [step, setStep] = useState(0)
  // 0: nhap Mail
  // 1: nhap code
  // 2: doi pass
  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      { step == 0 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <button type="button" className="btn btn-primary" onClick={() => {
          let txtEmail=document.querySelector("#email").value
          
          let model = {
            email: txtEmail,
          }
          checkForgetEmailAPI({email: txtEmail}).then(result => {
            setStep(1)
          }).catch(error => {
            console.log(error)
            alert(error.response.data.message)
          })
        }}>Next</button>
      </form>}

      { step == 1 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Code</label>
          <input type="email" className="form-control" id="code" />
        </div>

        <button type="button" className="btn btn-primary" onClick={() => {
          let txtCode=document.querySelector("#code").value
     

          let model = {
            code: txtCode,
          }
          checkForgetCodeAPI({code: txtCode}).then(result => {
            setStep(2)
          }).catch(error => {
            alert(error.response.data.message)
          })
        }}>Next</button>
      </form>}

      { step == 2 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">New password</label>
          <input type="email" className="form-control" id="email" />
        </div>

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
            alert(error.message)
          })
        }}>Next</button>
      </form>}
    </div>
  </div>
};

export default Forget;
