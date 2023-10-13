import { useEffect } from "react";

const useClickOutside = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onClose: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
};
export default useClickOutside;
