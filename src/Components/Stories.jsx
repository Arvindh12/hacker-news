import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewsCard from "./NewsCard";

function Stories({ storyId, storyType }) {
  const [allStrories, setAllStrories] = useState([]);

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
    </Container>
  );
}

export default Stories;
