// release v1.0 commit
import CustomFooter from "./CustomFooter";
import CustomNavbar from "./CustomNavbar";
import "./styles/basestyle.css";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div className="container-fluid p-0 m-0 base">
      <CustomNavbar />
      {children}
      <CustomFooter />
    </div>
  );
};

export default Base;
