import React, { useState } from 'react';
import Unsplash, { toJson } from "unsplash-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import './App.css';

const unsplash = new Unsplash({
  accessKey: "bOlGg_NXqKK9mCll6xfCyp9hNoqDkkMsXsAgqDy2NdI",
});

function App() {
  const [appState, setAppState] = useState("");
  const [photos, setPhotos] = useState([]);

  const client_id = "bOlGg_NXqKK9mCll6xfCyp9hNoqDkkMsXsAgqDy2NdI";

  const searchPhotos = async (e) => {
    e.preventDefault();
    unsplash.search
        .photos(appState)
        .then(toJson)
        .then((json) => {
          setPhotos(json.results);
        });
    };

  return (
    <>
    <section className="App">

      <Container className='container'>
        <h1 className="caption">Enter an object for available images</h1>
        <form className="form" onSubmit={searchPhotos}>
          <input
                type="text"
                name="appState"
                className="input"
                placeholder="Enter an object for available images"
                value={appState}
                onChange={(e) => setAppState(e.target.value)}
          />
          <input type="submit" className="btn btn-primary but" value="Search" />
        </form>
    
      <Row>
        {photos.map((item) => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} className="holder-col" key={item.id}>
                <img 
                  src={`${item.urls.small}`} 
                  alt={item.alt_description} 
                  className="img-fluid pic" 
                  width="100%"
                  height="100%"
                />
                <p className="description mr-2"><Badge variant="primary">Description:</Badge> {item.description ? item.description : 'There is no description available for now'}</p>
                <p className="location mr-2"><Badge variant="secondary">Location:</Badge> {item.user.location ? item.user.location : 'None available'}</p> <span className="likes"> {item.likes} <i class="far fa-heart"></i></span>
            </Col>
          );
        })}
      </Row>
      </Container>
    </section>
    </>
  );
}
export default App;


