import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import "./Dashboard.css";
// import Nav from './Nav'

class Dashboard extends Component {
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/auth/isLoggedIn");
        this.props.updateUser(res.data);
      } catch (err) {}
    }
  };

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
  };

  render() {
    // const {id} = this.props
    return (
      <div className="dash-wrapper">
        <div className="bd-example">
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-ride="carousel"
            style={{ width: "100%", height: '600px' }}>
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleCaptions"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleCaptions" data-slide-to="1" />
              <li data-target="#carouselExampleCaptions" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://shopify-customerio.s3.amazonaws.com/tools/image_attachment/image/custom_resized_760f85dc-8ca6-4d13-839a-376d8c36e5b2.jpg"
                  className="d-block w-100 image-fluid"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.geobrugg.com/portal/projektdb/pics/berechnet/51735/slider_detail_NORDBETON-concrete-barriers-FIA-Intercontinental-Drift-Cup-2017-0051760.jpg"
                  alt="..."
                  className="d-block w-100 image-fluid"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="http://photos.gripshiftslide.com/uploads/2012/02/2015/10/1J7A2079.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="recents-dash">
          <div className="recent-posts" />
          <div className="watchlist" />
          <div className="recent-news" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    username: reduxState.username
  };
};
const mapDispatchToProps = {
  updateUser,
  clearUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
