import PropTypes from "prop-types";

const Gap = ({ height }) => {
  return <div style={{ height: height }}></div>;
};

Gap.propTypes = {
  height: PropTypes.string,
};

Gap.defaultProps = {
  height: "20px",
};

export default Gap;