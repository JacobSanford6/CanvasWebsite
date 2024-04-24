import { useState, useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../.././index.css'
import { json, redirect, useHref, useParams } from 'react-router-dom'
import { makeRequest } from '../../api/ApiBroker'
import { Assignment } from '../../interfaces/Assignment'
import { func } from 'prop-types'

export function AssignmentsClass() {
    const [assignments, setAssignments] = useState<Assignment[]>([])
    const [isBusy, setIsBusy] = useState<boolean>(true);
    const { id } = useParams();

    useEffect(() =>{
        async function exec(){
            await makeRequest("courses/" + id + "/assignments", [["per_page", "1000"], ["bucket", "upcoming"],["order_by", "due_at"]]).then(res =>{
                setAssignments(res as Assignment[])
                
            })
            
            setIsBusy(false);
        }
        exec();
    } , [])

    const listItems = assignments?.map(assignment => {
        let dueDate: Date = new Date(assignment.due_at);
        
        function send(): void{
            window.location.href = ("/classes/" + id?.toString() + "/assignment/" + assignment.id.toString());
        }

        return(
            <div key={assignment.id} className='classBlock hoverBorderPurple' onClick={send}>
                <p>{assignment.name}</p>
                <p>{dueDate.toString()}</p>
            </div>
        )
    })
  
    return (
        <div>
            {isBusy ? <p>Loading...</p> :
            
            <div>
                {listItems}
            </div>
            
            }
        </div>
    )
  }

export function AssignmentsAssignment() {
    const { classId, assignmentId = -1} = useParams();
    const [assignment, setAssignment] = useState<Assignment>();
    const [busy, setBusy] = useState<boolean>(true);

    useEffect(()=>{
        async function exec(){
            await makeRequest("/courses/" + classId + "/assignments", [["assignment_ids[]", assignmentId.toString()]] )
            .then(res =>{
                if (res.length > 0){
                    setAssignment(res[0] as Assignment);
                }
            })
        }
        exec();
        setBusy(false);

        console.log(assignment?.name)
    }, []);

    return(
        <div>
        {!busy ?
            <p>{assignment?.name}</p> :
            <p>Loading...</p>
        }
        </div>
    )
}