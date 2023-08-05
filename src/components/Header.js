import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom"; //importing useLocation from react-router-dom to use it in the header component to show the add button only in the home page and not in the about page or any other page that we will add in the future

const Header = ({ tittle, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{tittle}</h1>
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};
Header.defaultProps = {
  tittle: "Task Tracker",
};
Header.propTypes = {
  tittle: PropTypes.string.isRequired,
};
export default Header;
