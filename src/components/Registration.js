import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
    password_confirm:"",
    e_mail:""
  };
  let navigate=useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username required"),
    password: Yup.string().required("Password required"),
    password_confirm: Yup.string().required("Confirm password required"),
  });

  const onSubmit = (data) => {
    if(data.password===data.password_confirm){
        delete data.password_confirm;
         axios.post("http://localhost:3001/user", data).then ((response) => {
            data.username= "";
            data.password= "";
            data.password_confirm="";
            data.e_mail="";
            if(response.data!=='Success'){
              alert("this user is already registered")
              
            }
            navigate(`/login`)
            
         });
    }
    else{
      alert('password not confirmed')
    }
    delete data.password_confirm;
   
       
  };  
  return (
    <div className='createForm'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>   
        <Form className="formContainer">
            <h2>Registration</h2>
            <label>E-mail:</label>

            <Field id="e_mail" name="e_mail" placeholder="E-mail"/>
            <label>Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field id="username" name="username" placeholder="Username"/>
            <label>Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field id="password" name="password" type="password" placeholder="password"/  >
            <label>Confirm Password:</label>
            <ErrorMessage name="password_confirm" component="span" />
            <Field id="password_confirm" name="password_confirm" type="password" placeholder="Confirm Password"/>
            <button type='submit'>Registration</button>
        </Form>
      </Formik>
    </div>
  )
};

export default Registration;
