import React from 'react';
import './Example.css';
import { Link } from 'react-router-dom';

function Post({ imageUrl, location, openHours, heading, content }) {
  return (
    <article className="post vt-post">
      <div className="row">
        <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
          <div className="onebox">
            <a href="#"><img src={imageUrl} className="img-responsive" alt="image post" /></a>
            <div className="author-info author-info-2">
              <ul className="list-inline">
                <li>
                  <div className="info1">
                    <p>Location</p>
                    <strong>{location}</strong>
                    Karapitiya
                  </div>
                </li>
                <li>
                  <div className="info2">
                    <p>Open</p>
                    24 hours
                    <strong>{openHours}</strong>
                  </div>
                </li>
                <li>
                  <div className="info3">
                  <div>
              <Link className="btn" to="/T_appointment">Book</Link>
            </div>
                    
                    <strong>{openHours}</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
          <div className="caption1">
            <h3 className="heading"><a href="#">{heading}</a></h3>
            <p>{content}</p>
            <a className="btn btn-default" href="#" role="button">Read More</a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Container() {
  return (
    <div className="container">
      <div className="decription">
        <Post
          imageUrl="https://www.medicalbuyer.co.in/wp-content/uploads/2024/02/Sri-Lanka-allocates-Rs-2000-million-for-developing-Karapitiya-Teaching-Hospital.jpg"
          postDate="Mar 21, 2015"
          comments="127"
          heading="Karapitiya Teaching Hospital"
          content="Karapitiya Teaching Hospital located in Karapitiya, Galle is the largest Tertiary care centre in the Southern Province of Sri Lanka."
        />
        <div className="clearfix"></div>
      </div>
    </div>
  );
}

export default Container;
