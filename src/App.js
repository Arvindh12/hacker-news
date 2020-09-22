import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import { Redirect, Route, Switch } from "react-router-dom";
import Stories from "./Components/Stories";

function App() {

  const [newStories, setNewStories] = useState([])
  const [topStories, setTopStories] = useState([])
  const [bestStories, setBestStories] = useState([])

  

  useEffect(() => {
    Promise.all( [fetch("https://hacker-news.firebaseio.com/v0/newstories.json").then(res => res.json()) ,
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then(res => res.json()) ,
    fetch("https://hacker-news.firebaseio.com/v0/beststories.json").then(res => res.json()) ])
      .then(result => {
        setNewStories(result[0]);
        setTopStories(result[1]);
        setBestStories(result[2]);
        console.log(result)
      })

  }, [])


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/top"></Redirect>
        </Route>
        <Route exact path="/top">
          <Stories storyType='top' storyId={topStories} />
        </Route>
        <Route exact path="/new">
        <Stories storyType='new' storyId={newStories} />
        </Route>
        <Route exact path="/best">
        <Stories storyType='best' storyId={bestStories} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
