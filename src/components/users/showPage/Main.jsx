import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import img2 from "../../../assets/images/image2.png";

const Main = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        Join Now
      </Button>
      <div className="col-12 col-md-12 mg-b-20 mt-5">
        <img
          width="24%"
          src={img2}
          alt="Banner EduNext"
          style={{ marginLeft: "40%" }}
        />
      </div>
    </>
  );
};

export default Main;
