import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]); // Initialize as an empty array

  // Fetch existing students from the server
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleSubmitStudentData = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const newStudent = { name, email };

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from server:", data);
        // Safely update students state
        setStudents( [...students, data]);
        e.target.reset(); // Clear the form after submission
      })
      .catch((error) => {
        console.error("Error submitting student data:", error);
      });
  };

  return (
    <>
      <h2>Student Management Project</h2>
      <p>Total Students: {students.length}</p>

      {students.map((student, index) => (
        <p key={index}>
          {student.id} - {student.name} - {student.email}
        </p>
      ))}

      <form onSubmit={handleSubmitStudentData}>
        <input type="text" name="name" placeholder="Name" required /> <br />
        <input type="email" name="email" placeholder="Email" required /> <br />
        <input type="submit" value="Submit Data" />
      </form>

      <h3>Students List</h3>
    </>
  );
}

export default App;
