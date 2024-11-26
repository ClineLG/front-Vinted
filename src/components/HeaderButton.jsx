// import Cookies from "js-cookie";

const HeaderButton = ({ setState2, state, setState1, action, name }) => {
  return (
    <button
      onClick={() => {
        action;
        setState2(!state);
        setState1(false);
      }}
    >
      {name}
    </button>
  );
};
export default HeaderButton;
