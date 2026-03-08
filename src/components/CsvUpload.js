import React from "react";
import * as XLSX from "xlsx";

function CsvUpload({students,setStudents}){

const upload=(e)=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=(evt)=>{

const data=new Uint8Array(evt.target.result)

const workbook=XLSX.read(data,{type:"array"})

const sheet=workbook.Sheets[workbook.SheetNames[0]]

const json=XLSX.utils.sheet_to_json(sheet)

const formatted=json.map((s)=>({
id:Date.now()+Math.random(),
name:s.name,
email:s.email,
age:s.age
}))

setStudents([...students,...formatted])

}

reader.readAsArrayBuffer(file)

}

return(

<div style={{margin:"15px"}}>

<input type="file" onChange={upload}/>

</div>

)

}

export default CsvUpload