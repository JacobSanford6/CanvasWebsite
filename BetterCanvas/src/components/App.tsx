import { useEffect, useState } from 'react'
import '.././App.css'
import { ClassesGrades, ClassesHome } from '../pages/classes/Classes'
import { AssignmentsAssignment, AssignmentsClass } from '../pages/classes/Assignments'
import PageLayout from '../layout/PageLayout'
import HomePage from '../pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '../pages/login'
import { useCookies } from 'react-cookie'
import { tryCookie } from '../api/UserServices'
import ForceLoginPage from '../pages/forceLogin'


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['authCookie']);
  const [auth, setAuth] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false) ;

  useEffect(() =>{
      if (!hasRun){
          
          tryCookie(cookies?.authCookie)
          .then(res =>{

            console.log("real auth: " + res.success)
            setHasRun(true);
            if (res.success){
              setAuth(true);
            }
            
          })
          .catch(err =>{
            setHasRun(true);
          }).finally(() =>{
            console.log("finally...")
            setHasRun(true)
          })
          
      } 
      
  }, [])

  //console.log("Auth: " + auth);

    return (


      <>
       {!hasRun ?
          <></>
          
          :

          <>
            {auth ?
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
              :
              <>
              <PageLayout>
                <BrowserRouter>
                  <Routes>
                    <Route path='/*' element={<ForceLoginPage />} />
                    <Route path='/login' element={<LoginPage />} />
                  </Routes>
                </BrowserRouter>
              </PageLayout >
              </>
            }
          </>
       }
      </>

/*
        <>
        {!hasRun ?
          <p>Loading...</p>
          
          :
          
          <>
          {auth ?
            /* 
            
            
            <>
            <p>test</p>
            </>
              :
    
          <PageLayout>
            <BrowserRouter>
              <Routes>
                <Route path='/*' element={<ForceLoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/backendApi' element={<></>} />
              </Routes>
            </BrowserRouter>
          </PageLayout >
    
            }


        
        </>
        
      </>
      
    } */
    ) 
  }

  


export default App
