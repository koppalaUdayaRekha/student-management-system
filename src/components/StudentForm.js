import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

const [student, setStudent] = useState({
name: "",
email: "",
age: ""
});

useEffect(() => {
if (editingStudent) {
setStudent(editingStudent);
}
}, [editingStudent]);

const handleChange = (e) => {
setStudent({
...student,
[e.target.name]: e.target.value
});
};

const validateEmail = (email) => {
return /\S+@\S+\.\S+/.test(email);
};

const handleSubmit = (e) => {

e.preventDefault();

if (!student.name || !student.email || !student.age) {
alert("All fields are required");
return;
}

if (!validateEmail(student.email)) {
alert("Enter valid email");
return;
}

if (editingStudent) {
updateStudent(student);
} else {
addStudent(student);
}

setStudent({
name:"",
email:"",
age:""
});

};

return (

<div style={{marginBottom:"20px"}}>

<form onSubmit={handleSubmit}>

<input
name="name"
placeholder="Name"
value={student.name}
onChange={handleChange}
style={{margin:"5px",padding:"5px"}}
/>

<input
name="email"
placeholder="Email"
value={student.email}
onChange={handleChange}
style={{margin:"5px",padding:"5px"}}
/>

<input
name="age"
type="number"
placeholder="Age"
value={student.age}
onChange={handleChange}
style={{margin:"5px",padding:"5px"}}
/>

<button type="submit" style={{margin:"5px",padding:"5px"}}>

{editingStudent ? "Update Student" : "Add Student"}

</button>

</form>

</div>

);

}

export default StudentForm;