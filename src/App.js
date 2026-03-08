import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Loading from "./components/Loading";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

const [students,setStudents] = useState([
{id:1,name:"Rahul",email:"rahul@gmail.com",age:21},
{id:2,name:"Priya",email:"priya@gmail.com",age:22},
{id:3,name:"Arjun",email:"arjun@gmail.com",age:23},
{id:4,name:"Sneha",email:"sneha@gmail.com",age:20},
{id:5,name:"Kiran",email:"kiran@gmail.com",age:24},
{id:6,name:"Divya",email:"divya@gmail.com",age:22},
{id:7,name:"Ravi",email:"ravi@gmail.com",age:25},
{id:8,name:"Anjali",email:"anjali@gmail.com",age:21},
{id:9,name:"Vikram",email:"vikram@gmail.com",age:23},
{id:10,name:"Pooja",email:"pooja@gmail.com",age:20}
])

const [editingStudent,setEditingStudent] = useState(null)
const [loading,setLoading] = useState(true)

const [search,setSearch] = useState("")
const [ageFilter,setAgeFilter] = useState("")

const [sortField,setSortField] = useState("")
const [sortOrder,setSortOrder] = useState("asc")

const [darkMode,setDarkMode] = useState(false)

const [currentPage,setCurrentPage] = useState(1)
const studentsPerPage = 5

useEffect(()=>{
setTimeout(()=>{
setLoading(false)
},1000)
},[])

const addStudent=(student)=>{
student.id = Date.now()
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

const filteredStudents = students.filter((student)=>{
return(
student.name.toLowerCase().includes(search.toLowerCase()) &&
(ageFilter==="" || student.age >= ageFilter)
)
})

const sortedStudents=[...filteredStudents].sort((a,b)=>{
if(!sortField) return 0

if(sortOrder==="asc"){
return a[sortField] > b[sortField] ? 1 : -1
}else{
return a[sortField] < b[sortField] ? 1 : -1
}
})

const indexOfLast = currentPage * studentsPerPage
const indexOfFirst = indexOfLast - studentsPerPage
const currentStudents = sortedStudents.slice(indexOfFirst,indexOfLast)

const downloadExcel=()=>{
const worksheet=XLSX.utils.json_to_sheet(sortedStudents)
const workbook=XLSX.utils.book_new()

XLSX.utils.book_append_sheet(workbook,worksheet,"Students")

const excelBuffer=XLSX.write(workbook,{
bookType:"xlsx",
type:"array"
})

const data=new Blob([excelBuffer],{
type:"application/octet-stream"
})

saveAs(data,"students.xlsx")
}

if(loading) return <Loading/>

return(

<div style={{
padding:"30px",
textAlign:"center",
background: darkMode ? "#2f3640" : "linear-gradient(to right,#74ebd5,#acb6e5)",
color: darkMode ? "white" : "black",
minHeight:"100vh"
}}>

<h1>Student Management Dashboard</h1>

<button
onClick={()=>setDarkMode(!darkMode)}
style={{marginBottom:"15px"}}
>
{darkMode ? "Light Mode" : "Dark Mode"}
</button>

<br/>

<input
type="text"
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"8px",marginRight:"10px"}}
/>

<input
type="number"
placeholder="Filter age..."
value={ageFilter}
onChange={(e)=>setAgeFilter(e.target.value)}
style={{padding:"8px"}}
/>

<div style={{
background:"white",
padding:"15px",
width:"200px",
margin:"15px auto",
borderRadius:"8px",
boxShadow:"0 2px 10px rgba(0,0,0,0.2)",
color:"black"
}}>
<h3>Total Students</h3>
<h2>{sortedStudents.length}</h2>
</div>

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
marginBottom:"20px"
}}
>
Download Excel
</button>

<StudentTable
students={currentStudents}
deleteStudent={deleteStudent}
setEditingStudent={setEditingStudent}
setSortField={setSortField}
setSortOrder={setSortOrder}
sortOrder={sortOrder}
/>

<div style={{marginTop:"15px"}}>

<button
onClick={()=>setCurrentPage(currentPage-1)}
disabled={currentPage===1}
>
Prev
</button>

<span style={{margin:"0 10px"}}>
Page {currentPage}
</span>

<button
onClick={()=>setCurrentPage(currentPage+1)}
disabled={indexOfLast >= sortedStudents.length}
>
Next
</button>

</div>

</div>

)

}

export default App