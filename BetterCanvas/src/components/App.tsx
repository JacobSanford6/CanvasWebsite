import { useState } from 'react'
import React from 'react'
import '.././App.css'
import { ClassesGrades, ClassesHome } from '../pages/classes/Classes'
import { AssignmentsAssignment, AssignmentsClass } from '../pages/classes/Assignments'
import PageLayout from '../layout/PageLayout'
import HomePage from '../pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/login'


function App() {
  return (
    <>
      <PageLayout>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/classes' element={<ClassesHome />} />
            <Route path='/classes/home' element={<ClassesHome />} />
            <Route path='/classes/grades' element={<ClassesGrades />} />
            <Route path='/classes/:id/assignments' element={<AssignmentsClass />} />
            <Route path='/classes/:classId/assignment/:assignmentId' element={<AssignmentsAssignment />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </PageLayout >
    </>
  )
}

export default App
