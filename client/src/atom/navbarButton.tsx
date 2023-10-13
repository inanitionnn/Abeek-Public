import { memo } from "react";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const NavbarButton = memo((props: Props) => {
  const { visible, setVisible } = props;
  return (
    <label className="btn btn-circle swap group swap-rotate border-2 bg-base-100 border-primary hover:bg-primary">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" checked={visible} />

      {/* hamburger icon */}
      <svg
        onClick={() => setVisible(!visible)}
        className="swap-off fill-current group-hover:fill-primary-content"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
      </svg>

      {/* close icon */}
      <svg
        onClick={() => setVisible(!visible)}
        className="swap-on fill-current group-hover:fill-primary-content"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
      </svg>
    </label>
  );
});

export default NavbarButton;
