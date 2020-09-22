import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Header() {
    let history = useHistory()
    return (
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand>Hacker News</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={() => history.push('/top')} >Top Stories</Nav.Link>
      <Nav.Link onClick={() => history.push('/new')} >New Stories</Nav.Link>
      <Nav.Link onClick={() => history.push('/best')} >Best stories</Nav.Link>
    </Nav>
  </Navbar>
    )
}

export default Header
