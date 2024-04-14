import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from 'axios';
import { baseurl } from "./urls/BaseUrl";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${baseurl}/notes`);
      console.log(response);
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const [sentence, setSentence] = useState("");

  const handleSubmit = async() => {
    try {
      console.log("Submitting note:", sentence);
      const res=await axios.post(`${baseurl}/notes`, { sentence });
      await fetchNotes(); // Fetch notes again to update the UI with the new note
      setSentence(""); // Clear the input after adding the note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleChange = (event) => {
    setSentence(event.target.value);
  };

  const handleDelete=async(id)=>{
    try {
      // Make a DELETE request to your backend API to delete the note
      await axios.delete(`${baseurl}/notes/${id}`);
      // If deletion is successful, fetch the updated data
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle error if deletion fails
    }
  }

  return (
    <div className="App">
      <div className="notes-container">
        <div className="notes-header">
          <div className="hamburger-menu">☰</div>
        </div>
        <div className="notes-heading">
          <h2>Notes</h2>
        </div>
      </div>
      <div className="inputBox">
        <input
          className="inputContent"
          placeholder="Take a note..."
          type="text"
          onChange={handleChange}
          value={sentence}
        />
        <button className='submitButton' onClick={handleSubmit}>Add Note</button>
      </div>
      <Card data={data} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
