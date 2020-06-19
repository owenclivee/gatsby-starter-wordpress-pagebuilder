import React from "react"
import FluidImage from "../1-wrappers/FluidImage"

const Banner = ({ image, text }) => {

  return (
    <section style={{ position: "relative" }}>
      <FluidImage image={image} withFallback={true} style={{marginBottom: '15px'}}/>
      <p style={{
        color: '#fff',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: '40px',
        textAlign: 'center',
        paddingTop:'80px',
        lineHeight: 1,
      }}>{text}</p>

    </section>
  )
};

export default Banner;
