import React from "react";

function StudentTable({ students, deleteStudent, setEditingStudent }) {

return (

<table
border="1"
cellPadding="10"
style={{
margin:"auto",
background:"white"
}}
>

<thead style={{background:"#40739e",color:"white"}}>

<tr>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{students.map((student)=>(
<tr key={student.id}>

<td>{student.name}</td>
<td>{student.email}</td>
<td>{student.age}</td>

<td>

<button
onClick={()=>setEditingStudent(student)}
style={{
marginRight:"5px",
background:"#44bd32",
color:"white",
border:"none",
padding:"5px"
}}
>
Edit
</button>

<button
onClick={()=>deleteStudent(student.id)}
style={{
background:"#e84118",
color:"white",
border:"none",
padding:"5px"
}}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

)

}

export default StudentTable