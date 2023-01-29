import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isheld ? "#59E391" : "#e6e6e6",
  };

  return (
    <div className="dieface" style={styles} onClick={props.holddice}>
      <h2>{props.value}</h2>
    </div>
  );
}
