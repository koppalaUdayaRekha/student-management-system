import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Loading from "./components/Loading";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

const [students, setStudents] = useState([
{ id:1, name:"Rahul", email:"rahul@gmail.com", age:21 },
{ id:2, name:"Priya", email:"priya@gmail.com", age:22 },
{ id:3, name:"Arjun", email:"arjun@gmail.com", age:23 },
{ id:4, name:"Sneha", email:"sneha@gmail.com", age:20 },
{ id:5, name:"Kiran", email:"kiran@gmail.com", age:24 },
{ id:6, name:"Divya", email:"divya@gmail.com", age:22 },
{ id:7, name:"Ravi", email:"ravi@gmail.com", age:25 },
{ id:8, name:"Anjali", email:"anjali@gmail.com", age:21 },
{ id:9, name:"Vikram", email:"vikram@gmail.com", age:23 },
{ id:10, name:"Pooja", email:"pooja@gmail.com", age:20 }
]);

const [editingStudent, setEditingStudent] = useState(null);
const [loading, setLoading] = useState(true);
const [search,setSearch] = useState("");

useEffect(() => {

setTimeout(()=>{
setLoading(false);
},1000)

},[]);

const addStudent=(student)=>{

student.id = Date.now();
setStudents([...students,student])

}

const updateStudent=(student)=>{

setStudents(
students.map((s)=> s.id===student.id ? student : s)
)

setEditingStudent(null)

}

const deleteStudent=(id)=>{

if(window.confirm("Delete this student?")){

setStudents(
students.filter((s)=> s.id!==id)
)

}

}

const downloadExcel=()=>{

const worksheet = XLSX.utils.json_to_sheet(students)

const workbook = XLSX.utils.book_new()

XLSX.utils.book_append_sheet(
workbook,
worksheet,
"Students"
)

const excelBuffer = XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
})

const data = new Blob(
[excelBuffer],
{type:"application/octet-stream"}
)

saveAs(data,"students.xlsx")

}

const filteredStudents = students.filter((student)=>
student.name.toLowerCase().includes(search.toLowerCase())
)

if(loading) return <Loading/>

return (

<div style={{
padding:"30px",
textAlign:"center",
background:"#f5f6fa",
minHeight:"100vh"
}}>

<h1 style={{color:"#2f3640"}}>
Student Management System
</h1>

<input
type="text"
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
padding:"8px",
width:"220px",
marginBottom:"10px"
}}
/>

<p style={{fontWeight:"bold"}}>
Total Students: {students.length}
</p>

<StudentForm
addStudent={addStudent}
updateStudent={updateStudent}
editingStudent={editingStudent}
/>

<button
onClick={downloadExcel}
style={{
background:"#273c75",
color:"white",
padding:"8px 15px",
border:"none",
cursor:"pointer",
marginBottom:"20px"
}}
>
Download Excel
</button>

<StudentTable
students={filteredStudents}
deleteStudent={deleteStudent}
setEditingStudent={setEditingStudent}
/>

</div>

);

}

export default App;