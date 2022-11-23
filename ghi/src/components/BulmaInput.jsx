function BulmaInput(props) {
  const { type='text', required=true, label, id, placeholder, value, onChange } = props;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <input
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          type={type}
          className="input"
          placeholder={placeholder}
          id={id} />
      </div>
    </div>
  );
}

export default BulmaInput;
