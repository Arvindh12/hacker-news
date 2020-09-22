import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NewsCard from "./NewsCard";

function Stories({ storyId, storyType }) {
  const [allStrories, setAllStrories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    let storiesList = [];
    storyId
      .filter((i, index) => ( (currentPage+1)*10 <= index && index < (currentPage+1)*10 + 10 ) )
      .forEach((item) => {
        storiesList.push(
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json`
          ).then((res) => res.json())
        );
      });
    Promise.all(storiesList).then((result) => {
      console.log(result);
      setAllStrories(result);
      setCurrentPage(currentPage+1)
    });
  }

  const handlePrev = () => {
    let storiesList = [];
    storyId
      .filter((i, index) => ( (currentPage-1)*10 <= index && index < (currentPage-1)*10 + 10 ) )
      .forEach((item) => {
        storiesList.push(
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json`
          ).then((res) => res.json())
        );
      });
    Promise.all(storiesList).then((result) => {
      console.log(result);
      setAllStrories(result);
      setCurrentPage(currentPage-1)
    });
}

  useEffect(() => {
    let storiesList = [];
    storyId
      .filter((i, index) => index < 10)
      .forEach((item) => {
        storiesList.push(
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json`
          ).then((res) => res.json())
        );
      });
    Promise.all(storiesList).then((result) => {
      console.log(result);
      setAllStrories(result);
    });
  }, [storyId]);

  return (
    <Container>
      {allStrories.map((item) => (
        <Row className="my-3" key={item.id}>
          <Col>
            <NewsCard
              className="my-3"
              title={item.title}
              type={item.type}
              link={item.url}
            />
          </Col>
        </Row>
      ))}
        <Row className="my-3">
          <Col>
          <Button className="mx-3" onClick={handlePrev} disabled={currentPage === 0} >Prev</Button>
          <Button className="mx-3" onClick={handleNext} disabled={currentPage >= storyId.length/10}  >Next</Button>
          </Col>
        </Row>
    </Container>
  );
}

export default Stories;
