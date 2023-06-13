import React from 'react'
import './Style.css'
import { useState,useEffect } from 'react'
import Validation from './Validation'
import axios from 'axios';

function SignupForm() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [classn, setClassn] = useState("");
    const [division, setDivision] = useState("");
    const [gender, setGender] = useState("");

    const values={name,dob,classn,division,gender};

    const [errors, setErrors] = useState({})
    const [students, setUsers] = useState([]);


    useEffect(() => {
        (async () => await Load())();
        }, []);
        async function  Load()
        {
           const result = await axios.get(
               "http://localhost:8090/api/v1/student/getall");
               setUsers(result.data);
        }
      

    function handleValidation(e) {
        e.preventDefault()
        setErrors(Validation(values))
        try
            {
            axios.post("http://localhost:8090/api/v1/student/save",
            {
                name: name,
                dob: dob,
                classn: classn,
                division: division,
                gender: gender
                });
                  setName("");
                  setDob("");
                  setClassn("");
                  setDivision("");
                  setGender("");
                  Load();
                }
        catch(err)
            {
              alert("User Registation Failed");
            }

    }

    const sorted=students.sort((a,b)=> {return a.name > b.name ? 1 : -1;});


    const cards = sorted.map((val)=>
    <tr>
    <td>{val.name}</td>
    <td>{val.dob}</td>
    <td>{val.classn}</td>
    <td>{val.division}</td>
    <td>{val.gender}</td>
</tr>
    )

  return (
        <div className='App'>
            <h4>REGISTRATION FORM</h4>
            <div>
                <form onSubmit={handleValidation}>
                    <label for="name" className="label"><strong>Name:</strong></label>
                    <input type="text" placeholder="Enter Name" value={name}
                        name="name" onChange={(event) =>
                            {
                              setName(event.target.value);      
                            }} className='inputform' />
                    {errors.name && <p style={{color: "red"}}>{errors.name}</p>}

                    <br/><label for="dob" className="label"><strong>DOB:</strong></label>
                    <input type="date" placeholder="Enter DOB"  value={dob}
                    name="dob" onChange={(event) =>
                        {
                          setDob(event.target.value);      
                        }} className='inputform'/>
                    {errors.dob && <p style={{color: "red"}}>{errors.dob}</p>}

                    <br/><label for="classn" className="label"><strong>Class:</strong></label>
                    <select type="text" className="selection" placeholder="Enter Class" value={classn}
                    name="classn" onChange={(event) =>
                        {
                          setClassn(event.target.value);      
                        }}>
                                    <option disabled="disabled" selected="selected">Choose option</option>
                                    <option>I</option>
                                    <option>II</option>
                                    <option>III</option>
                                    <option>IV</option>
                                    <option>V</option>
                                    <option>V1</option>
                                    <option>V11</option>
                                    <option>V111</option>
                                    <option>1X</option>
                                    <option>X</option>
                                    <option>X11</option>
                                    <option>X12</option>
                                </select>{errors.classn && <p style={{color: "red"}}>{errors.classn}</p>}

                    <br/><label for="division" className="label"><strong>Division:</strong></label>
                    <select type="text" className="selection" placeholder="Enter Division" value={division}
                    name="division" onChange={(event) =>
                        {
                          setDivision(event.target.value);      
                        }}>
                                    <option disabled="disabled" selected="selected">Choose option</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>{errors.division && <p style={{color: "red"}}>{errors.division}</p>}

                    <br/><label for="gender" className="label"><strong>Gender:</strong></label>
                    <input className="radioinput" type="radio" id="gender" value="male"
                    name="gender" onChange={(event) =>
                        {
                          setGender(event.target.value);      
                        }}/> Male  
                    <input className="radioinput" type="radio" id="gender" value="female"
                    name="gender" onChange={(event) =>
                        {
                          setGender(event.target.value);      
                        }}/> Female {errors.gender && <p style={{color: "red"}}>{errors.gender}</p>}<br/>  

                    <div>
                        <button className='button'>Register</button>
                    </div>
                </form>
            </div>
            <br/><br/>

            <div className="stud">
 
            <table>
             <tr>
             <th>Name</th>
             <th>DOB</th>
             <th>CLASS</th>
             <th>DIVISION</th>
             <th>GENDER</th>
         </tr>
         {cards}

     </table>
     
 </div>


</div>
  )
}

export default SignupForm;