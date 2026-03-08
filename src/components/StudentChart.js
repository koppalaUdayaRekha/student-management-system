import React from "react";
import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function StudentChart({students}){

const data={
labels: students.map((s)=>s.name),
datasets:[
{
label:"Age",
data: students.map((s)=>s.age),
backgroundColor:"rgba(54,162,235,0.6)"
}
]
}

return(
<div style={{width:"500px",margin:"20px auto"}}>
<Bar data={data}/>
</div>
)

}

export default StudentChart