import React from "react"

const AllLayouts = ({ layout }) => {

  const layoutType = layout.fieldGroupName;

  const Default = () => <div>In AllLayouts the mapping of this component is missing: {layoutType}</div>;

  const LayoutTag = layout.layoutFile ? layout.layoutFile : Default;

  return (
    <LayoutTag {...layout} />
  )
};

export default AllLayouts;
