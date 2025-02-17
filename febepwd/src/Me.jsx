import { useLocation } from "react-router-dom";

const Me = () => {
  const location = useLocation();
  const { message } = location.state || {};
  console.log(message);
  return <div>{message && <p>Welcome {message}</p>}</div>;
};

export default Me;
