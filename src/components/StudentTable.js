import React from "react";

function StudentTable({
students,
deleteStudent,
setEditingStudent,
setSortField,
setSortOrder,
sortOrder
}){

const sort=(field)=>{
setSortField(field)
setSortOrder(sortOrder==="asc"?"desc":"asc")
}

return(

<table border="1" cellPadding="10" style={{margin:"auto",background:"white"}}>

<thead style={{background:"#40739e",color:"white"}}>

<tr>
<th onClick={()=>sort("name")} style={{cursor:"pointer"}}>Name</th>
<th>Email</th>
<th onClick={()=>sort("age")} style={{cursor:"pointer"}}>Age</th>
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
background:"#44bd32",
color:"white",
border:"none",
padding:"5px",
marginRight:"5px"
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