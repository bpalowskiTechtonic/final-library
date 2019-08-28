import React from 'react';
import "../css/bootstrap.min.css";
import "../css/layout.css";
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
    return(

      <div className="AboutMe">
        <div id="my-clouds">
    <marquee behavior="scroll" direction="right" scrollamount="50">
        <i className="fa fa-hand-o-right" style={{color:'black',fontSize:50}}></i>
    </marquee>
    <marquee behavior="scroll" direction="left" scrollamount="10">
    <i className="fa fa-hand-o-left" style={{color:'white',fontSize:50}}></i>
    </marquee>
    <marquee behavior="scroll" direction="left" scrollamount="50">
    <i className="fa fa-ambulance" style={{color:'white',fontSize:100}}></i>
    </marquee>
    <marquee behavior="scroll" direction="right" scrollamount="60">
    <i className="fa fa-motorcycle" style={{color:'white',fontSize:40}}></i>
    </marquee>
</div> 

   <h1>ABout</h1>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
       </div>
    )
  }

}



export default About;
