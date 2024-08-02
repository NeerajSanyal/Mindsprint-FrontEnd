import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
 
const CourseCrud = () => {
  const [courseName, setCourseName] = useState('');
  const [courseAuthor, setCourseAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
 
  const addCourse = async () => {
    try {
    const resp=await axios.post('http://localhost:8083/course/addCourse', {
        coursename: courseName,
        courseauthor: courseAuthor,
        url: url,
      });
      setCourseName('');
      setCourseAuthor('');
      setUrl('');
      // setSuccessMessage('Course added to the database');
      // setTimeout(() => {
      //   setSuccessMessage('');
      // }, 3000);
      if(resp.status==200){
        alert('Course added to the database');
        fetchData();
 
      }
     
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
 
  // useEffect(()=>{
  //   addCourse();
  // },[])
 
  const [list,setList]=useState([]);
  const [selected, setSelected] =useState(null);
 
   const fetchData = async ()=>{
         try{
          const resp = await axios.get('http://localhost:8083/course/getAll');
          console.log(resp);
          if(resp.status===204){
            alert('No Data Available')
          }else{
            setList(resp.data);
          }
         
         }catch (error){
          console.log(error);
         }
   }
 
   const handleEdit=async(e)=>{
    e.preventDefault();
    const resp=await axios.put('http://localhost:8083/course/updateCourse/'+selected.id,selected);
    if(resp.status==200){
        alert('course updated');
        fetchData();
        setSelected(null);
    }else{
        alert('Error while update')
    }
}
useEffect(()=>{
  fetchData();
},[])
 
 
  const [courses, setCourses] = useState([]);
 
const getAllCourses = async () => {
  try {
    const response = await axios.get('http://localhost:8083/course/getAll');
    if (response.status === 200) {
      setCourses(response.data);
    } else {
      console.error("Error fetching courses:", response.data);
      // Handle error fetching courses (e.g., show error message)
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    // Handle unexpected errors
  }
};
 
useEffect(() => {
  getAllCourses();
}, []);
 
const deleteCourse = async (courseId) => {
  try {
    const response = await axios.delete(`http://localhost:8083/course/deleteCourse/${courseId}`);
    if (response.status === 200) {
      alert("Course deleted successfully");
   
      setCourses(courses.filter((course) => course.id !== courseId));
      fetchData();
    } else {
      alert("Error deleting course:", response.data);
      // fetchData();
     
   
    }
  } catch (error) {
    console.error("Error deleting course:", error);
 
  }
};

 
 

  return (
    <>
    <h2 className="text-center mb-1">Courses</h2>
    <Container className="" style={{paddingLeft: '490px'}}>
    
      {successMessage && (
        <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>
      )}
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup >
          <Label for="courseName">Course Name</Label>
          <Input
            type="text"
            name="coursename"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Label for="courseAuthor">Course Author</Label>
          <Input
            type="text"
            name="courseAuthor"
            id="courseAuthor"
            value={courseAuthor}
            onChange={(e) => setCourseAuthor(e.target.value)}
          />
          <Label for="url">URL</Label>
          <Input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" onClick={addCourse}>
          Add Course
        </Button>
      </Form>
    </Container>
<br></br>
    <div  style={{paddingLeft: '490px'}}>
    <h3>All courses</h3>
      <div style={{display: 'inline-block' , width: '45%', verticalAlign: 'top'}}>
      <table style={{border: '1px solid black', padding: '10px'}} >
                <thead style={{border: '1px solid black', padding: '10px'}}>
                  <tr>
                    <th style={{border: '1px solid black', padding: '10px'}}>Id</th>
                    <th style={{border: '1px solid black', padding: '10px'}}>Name</th></tr>
                    </thead>
                <tbody>
                    {
                        list.map(item=>(
                            <tr  key={item.id}>
                                <td style={{border: '1px solid black', padding: '10px'}}>{item.id}</td>
                                <td style={{border: '1px solid black', padding: '10px'}}>{item.coursename}</td>
                                <td style={{border: '1px solid black', padding: '10px'}}>
                                    <button className='btn bg-warning' onClick={()=>setSelected(item)}>Edit Course</button>
                                </td>
                                <td style={{border: '1px solid black', padding: '10px'}}>
                                     <button className='btn bg-danger text-white' onClick={()=>deleteCourse(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
      </div>
            

           <div style={{display: 'inline-block', width: '45%', verticalAlign: 'top'}}>
           {
            selected &&
            <form onSubmit={handleEdit}>
            <h3>Edit Course</h3>
            <input type="text" placeholder="Enter Course"
            value={selected.coursename} onChange={(e)=>setSelected({...selected,coursename:e.target.value})}/>
            <button type="submit">Save Data</button>
        </form>
           }
            </div> 
           
        </div>
        <br></br><br></br>

    </>
  );
};
 
export default CourseCrud;