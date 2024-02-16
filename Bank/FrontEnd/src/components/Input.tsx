interface IInputProps {
  label: string;
  id: string;
  error?: string;
}

function Input({ label, id, error, ...props }: IInputProps & any) {
  return (
    <>
      <div>
        <input id={id} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
      <div>{error && <span>{error}</span>}</div>
    </>
  );
}

export default Input;
