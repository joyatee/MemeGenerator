import React, { Component } from "react";
import classes from "./mem.module.css";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allmemeImages: [],
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://api.imgflip.com/get_memes")
      .then((Response) => Response.json())
      .then((Response) => {
        const { memes } = Response.data;
        //console.log(memes[0]);
        this.setState({ allmemeImages: memes });
      });
  }

  changeHandler(event) {
    //console.log("its working");
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit");
    const randomNum = Math.floor(
      Math.random() * this.state.allmemeImages.length
    );
    console.log(randomNum);
    const randImg = this.state.allmemeImages[randomNum].url;
    console.log(randImg);
    this.setState({ randomImage: randImg });
  }

  render() {
    return (
      <div>
        {" "}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            onChange={this.changeHandler}
          ></input>
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.changeHandler}
          ></input>
          <button>Gen</button>
        </form>
        <div className={classes.container}>
          <img src={this.state.randomImage}></img>
          <h2 className={classes.bottomLeft}>{this.state.topText}</h2>
          <h2 className={classes.topLeft}>{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
