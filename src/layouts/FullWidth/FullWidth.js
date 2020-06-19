import React from "react"
import AllComponents from "../../components/1-wrappers/AllComponents";

const FullWidth = ({ components }) => {

  return (
    <section style={{ position: "relative" }}>
      {
        components.map((component, index) => {
          return <AllComponents key={index} component={component} />
        })
      }
    </section>
  );

};

export default FullWidth;
