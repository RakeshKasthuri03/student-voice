
import "./complaint.css";
import "./complaint.jpg";
import axios from 'axios'

import { NavLink,useNavigate } from "react-router-dom";
function ComplaintComponent() {

  const navigate=useNavigate()
  const handleComplaint= async()=>{
    try{
      var id=localStorage.getItem("userId");
      if(localStorage.getItem("type")==="anonymous"){
        id="XXXXXXXXXX";
      }
      const complaint={
          userId: id,
          category : document.getElementById("category").value,
          nature : document.getElementById("nature").value,
          description : document.getElementById("textarea").value,
          image : document.getElementById("image").value,
          status : "pending",
          //complaintID : "5",
      }
      const response=await axios.post("https://student-voice-backend.onrender.com/complaint/savecomplaint",complaint,
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
      )

      if(response.status===200){
        alert("complaint registered successfully");
        localStorage.removeItem("type");
        navigate("/userhome")
      }
      else{
        alert("complaint Not registered ");
        navigate("/complaint")
      }

    }
    catch(error){
      console.error(error)
      alert("complaint Not registered ");
      navigate("/userhome")
    }
  }

  return (
    <>
      <div className="complaint-reg">
       
        <h1>Make the Complaint</h1>
        <div className="com-tab">
        <div className="box4">
          <div className="box1">
            <label for="">Category</label>
            <select id="category" required>
              <option value="">Select the Category</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
            <br />
            <br />
            <label>
              Nature of Complaint <input type="text" id="nature" required placeholder="" />
            </label>
            <br />
            <br />
            <label>Complaint Description</label>
            <br />

            <textarea
              name=""
              cols="70"
              rows="10"
              required
              placeholder="text here...!"
              id="textarea"
            ></textarea>

            <br />

            <br />
            <p>Regarding image(if any) paste the url of image</p>

            <input type="text" name="" id="image" accept="image/*"/>
            <br />
            <br />
            <br />
            <button id="button" onClick={()=>{handleComplaint()}}>Raise Complaint</button>
          </div>
          </div>
          <div className="com-img">
            <img src={require("./complaint.jpg")} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ComplaintComponent;
