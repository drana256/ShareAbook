import { useState, useEffect } from "react";
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import BookTile from "./BookTile";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import "./styleHomePage.css";
import { signOut } from "firebase/auth";
import { auth } from './firebaseConfig';
import { useNavigate, useLocation } from "react-router-dom";
import storage from "./firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const HomePage=()=> {
  const navigate = useNavigate();
  const [newBookName, setNewBookName] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");

  const [books, setBooks] = useState([]);
  const booksCollectionRef = collection(db, "bookLibrary");

  // State to store uploaded file
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  // progress
  const [percent, setPercent] = useState(0);

  const addBook = async () => {
    //for empty book name and empty author name
    if (newBookName === "" || newAuthorName === "" || !file || percent!==100)
    {
      alert("One of the Fields is empty. Book Name, Author Name and file should be choosen! Then Press the upload button first then the add book button");
      return;
    }
    else{
      //adding the book name and author name to datbase
      await addDoc(booksCollectionRef, { bookName: newBookName, authorName: newAuthorName, url:imageURL }); 
      window.location.reload();
    }
  }

  //Load books immediately on page load
  useEffect(() =>{

    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getBooks();
  }, []);

  //for loging out
  const logout = async () => {

    await signOut(auth);
    navigate("/");  //returns to login page
  }

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  //when upload button is pressed without selecting a file
  const handleUpload = async () => {
    if (!file) {
        alert("Please choose a file first!")
    }
    //storage location refrence
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    //for progress percentage for uploading file
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageURL(url);
            return url;
        });
    
    })
  }

  //display current user email
  const {state} = useLocation();
  
  return (
    <div className = "HomePage">
      <div className = "siteTitle"><p>Share A Book</p></div>
      <div className = "currLoggedinUserContainer">
        <div className = "currLoggedinUser">
          <p>Current User: {state.email} {" "}<Button onClick={logout}>Sign Out</Button></p>
          
        </div>
      </div>
      <div className = "bookInfoInputContainer">
        <div className = "bookInfoInput">
          <input placeholder="Book Name ..." onChange={ (event) => {setNewBookName(event.target.value)}}></input>
          <input placeholder="Author Name ..." onChange={ (event) => {setNewAuthorName(event.target.value)}}></input>
          <Button variant = "primary" onClick={ addBook } style={{marginLeft:"10px"}}>Add book</Button>
            <div>
              <input type="file" onChange={handleChange} accept="" />
              <Button variant = "secondary" onClick={handleUpload}>Upload File</Button>
              <p>{percent} % done</p>
            </div>
        </div>  
      </div>
      
      <div className="bookContainer">
        {books.map((book) => {
          return <div>
            <BookTile bookInfo = { book }/>
            <br/>
          </div>;
        })}
      </div>
    </div>
  );
}

export default HomePage;