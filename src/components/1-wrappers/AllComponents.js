import React from "react"

const AllComponents = ({ component }) => {

  const componentType = component.fieldGroupName;

  const Default = () => <div>In AllComponents the mapping of this component is missing: {componentType}</div>;

  const ComponentTag = component.componentFile ? component.componentFile : Default;

  return (
    <ComponentTag {...component} />
  )
};

export default AllComponents;
