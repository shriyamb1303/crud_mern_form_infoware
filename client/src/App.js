import './App.css';
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers")
      .then((response) => {
        setListOfUsers(response.data);
      })
  })

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name,
      job,
      phone,
      email
    })
      .then((response) => {
        setListOfUsers([...listOfUsers, {
          name,
          job,
          phone,
          email
        }])
      })
  }

  return (
    <div className="App">
      <h1>User Management System</h1>

      <table>
        <tr>
          <th>Employee Name</th>
          <th>Job Role</th>
          <th>Phone No.</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        {listOfUsers.map((user) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.job}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button className='edit'>Edit</button>
                <button className='delete'>Delete</button>
              </td>
            </tr>
          )
        })}
        {/* <tr>
          <td>Jane Doe</td>
          <td>Designer</td>
          <td>9876543210</td>
          <td>jane.doe@example.com</td>
          <td>
            <button className='edit'>Edit</button>
            <button className='delete'>Delete</button>
          </td>
        </tr> */}

      </table>

      <button className="submit" onClick={toggleForm}>Add User</button>
      <br /><br /><br /><br /><br />
      {showForm && (
        <form className='addUserForms'>
          <label for="namee">Employee Name:</label><br />
          <input type="text" id='namee' name='namee' onChange={(e) => setName(e.target.value)} /><br />
          <label for="jobr">Job Role:</label><br />
          <input type="text" id='jobr' name='jobr' onChange={(e) => setJob(e.target.value)} /><br />
          <label for="phoneu">Phone No:</label><br />
          <input type="number" id='phoneu' name='phoneu' onChange={(e) => setPhone(e.target.value)} /><br />
          <label for="demail">Email id:</label><br />
          <input type="email" id='demail' name='demail' onChange={(e) => setEmail(e.target.value)} />
          <input type="submit" value="Submit" onClick={createUser} />
        </form>
      )}
    </div>
  );
}

export default App;
