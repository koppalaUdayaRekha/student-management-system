import React,{useState,useEffect} from "react"

function StudentForm({addStudent,updateStudent,editingStudent}){

const [student,setStudent]=useState({
name:"",
email:"",
age:""
})

useEffect(()=>{
if(editingStudent){
setStudent(editingStudent)
}
},[editingStudent])

const handleChange=(e)=>{
setStudent({
...student,
[e.target.name]:e.target.value
})
}

const validateEmail=(email)=>{
return /\S+@\S+\.\S+/.test(email)
}

const handleSubmit=(e)=>{

e.preventDefault()

if(!student.name || !student.email || !student.age){
alert("All fields required")
return
}

if(!validateEmail(student.email)){
alert("Invalid email")
return
}

if(editingStudent){
updateStudent(student)
}else{
addStudent(student)
}

setStudent({name:"",email:"",age:""})
}

return(

<form onSubmit={handleSubmit} style={{margin:"20px"}}>

<input
name="name"
placeholder="Name"
value={student.name}
onChange={handleChange}
style={{padding:"6px",marginRight:"5px"}}
/>

<input
name="email"
placeholder="Email"
value={student.email}
onChange={handleChange}
style={{padding:"6px",marginRight:"5px"}}
/>

<input
name="age"
type="number"
placeholder="Age"
value={student.age}
onChange={handleChange}
style={{padding:"6px",marginRight:"5px"}}
/>

<button type="submit">
{editingStudent?"Update":"Add Student"}
</button>

</form>

)

}

export default StudentForm