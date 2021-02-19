import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms")
})


const Form = (props) => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const validate = e => {
        let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ""
            })
        })
        .catch(err => {
            setErrorState({
                ...errorState,
                [e.target.name]: err.errors[0]
            })
        })


    }

    const inputChange = (e) => {
        e.persist();
        validate(e);
        let value = 
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", formState)
        .then(res => 
            {console.log(res);
            props.addUser(formState)})
        .catch(err => console.log(err));
        setFormState({
        name: "",
        email: "",
        password: "",
        terms: false
        })
    }

    return (
       <form onSubmit={handleSubmit}>
           <label htmlFor="name">
               Name
               <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={inputChange}
                /> 
           </label>
           <label htmlFor="email">
               Email
               <input
               type="text"
               name="email"
               id="email"
               value={formState.email}
               onChange={inputChange}
               />
            {errorState.email.length > 0 ? (
                <p className="error">{errorState.email}</p>
            ) : null}
           </label>  
           <label htmlFor="pass">
               Password
               <input
               type="password"
               name="password"
               id="pass"
               value={formState.password}
               onChange={inputChange}
               />
           </label>
           <label htmlFor="terms">
               Terms and Conditions
               <input
               type="checkbox"
               name="terms"
               id="terms"
               checked={formState.terms}
               onChange={inputChange}
               />
            {errorState.terms.length > 0 ? (
                <p className="error">{errorState.terms}</p>
            ) : null}
           </label>
           <button>Submit</button>
       </form>
    )
}

export default Form; 