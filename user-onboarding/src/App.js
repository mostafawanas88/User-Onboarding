import './App.css';
import Form from "./Components/Form";
import NewUser from "./Components/NewUser"
import { useState } from "react";

function App() {

  const [user, setUser] = useState([])

  const addUser = (newUser) => {
    setUser([...user, newUser])
  }

  return (
    <div className="App">
      <h1>Submission Form</h1>
      <Form addUser={addUser}/>
      <NewUser user={user} />
    </div>
  );
}

export default App;
