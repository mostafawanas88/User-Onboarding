import React from "react";

const NewUser = (props) => {
    return (
        <div>
            {props.user.map(user => {
                return (
                <div>
                    <h2>User Name: {user.name}</h2>
                    <h2>User Email: {user.email}</h2>
                </div>
                )
            })}
        </div>
    )
}

export default NewUser;