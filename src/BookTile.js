import React from 'react';
import {Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import "./bookTile.css";

const BookTile = (props) => {
  const download = () => {
    window.location.assign(props.bookInfo.url);
  }

  return (
    <Card style={{ 
      width: '15rem', 
      height: '30rem',
      backgroundColor: "white", 
      textAlign:"bottom"
    }}>
      
       <Card.Img variant="top" src = {props.bookInfo.url} style={{width:"15rem", height:"20rem" }}/>
     
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}>{props.bookInfo.bookName}</Card.Title>
        <Card.Text style={{textAlign:"center"}}>
          {props.bookInfo.authorName}
        </Card.Text>
        <Button variant="primary" onClick = {download}>Download Book</Button>
      </Card.Body>
    </Card>
  );
}

export default BookTile;