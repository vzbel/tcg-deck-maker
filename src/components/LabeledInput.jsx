const LabeledInput = ({ name, placeholder, value, onChange }) => {
  const nameUpper = name.slice(0, 1).toUpperCase() + name.slice(1);
  return (
    <>
      <label>{nameUpper}</label>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
};

export default LabeledInput;
