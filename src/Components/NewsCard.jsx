import React from "react";
import { Button, Card } from "react-bootstrap";

function NewsCard({title , link , type }) {
  return (
    <Card className="text-center">
      <Card.Header>{type}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary" href={link} target="_blank" >Open Link</Button>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
