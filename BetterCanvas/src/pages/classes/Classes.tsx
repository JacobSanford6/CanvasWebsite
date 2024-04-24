import { useState, useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../.././index.css'
import { apiKey } from '../../apiKey.json'
import axios, { AxiosHeaders } from 'axios'
import { AxiosResponse } from 'axios'
import { json, useHref, useParams } from 'react-router-dom'
import { makeRequest } from '../../api/ApiBroker'
import { Course } from '../../interfaces/Course'

let api: string = "http://localhost:4445/api/v1/"

interface Props {
  testNumber: number;
}



export function ClassesHome() {
  return (
    <>
      <div>
        <p>Classes Home</p>
      </div>
    </>
  )
}

export function ClassesGrades() {
  const [data, setData] = useState<Course[]>();
  // get classes
  useEffect(() => {
    async function exec() {
      
      await makeRequest("courses", [["include", "total_scores"], ["enrollment_state", "active"], ["per_page", "1000"]]).then(res => {
        setData(res as Course[]);
        console.log(data)
      })

    }
    exec()
  }, [])

  // create objects with json data
  const listItems = data?.map((course) => {
    let parenthesisStart = course["name"].indexOf("(");
    let nameFormatted: string;

    if (parenthesisStart !== -1) {
      nameFormatted = course.name.substring(0, parenthesisStart);
    } else {
      nameFormatted = course.name;
    }

    const redirect = (): void => {
      window.location.href = ("/classes/" + course.id + "/assignments")
    }

    return (
      <div key={course.id} className='classBlock hoverBorderPurple' onClick={redirect}>
        <p>{nameFormatted}</p>
        <p>{course.enrollments[course.enrollments.length - 1].computed_current_score}% ({course.enrollments[course.enrollments.length - 1].computed_current_letter_grade})</p>
      </div >
    )
  }

  )

  return (
    <>
      <div id='classes'>
        {listItems}
      </div>

    </>
  )
}


