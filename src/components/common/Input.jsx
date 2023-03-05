const Input = ({ onChange, value, uid }) => {
  return (
    <input
      id={uid}
      aria-label={uid}
      type="text"
      size="10"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
