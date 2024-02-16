import Wrapper from "../assets/stylingWrappers/Input";

interface IInputProps {
  label: string;
  id: string;
  error?: string;
}

function Input({ label, id, error, ...props }: IInputProps & any) {
  return (
    <Wrapper>
      <input id={id} name={id} {...props} />
      <label htmlFor={id}>{label}</label>
      <div className="error">{error && <span>{error}</span>}</div>
      {/* <div className="field">
        <input id={id} {...props} />
        <label htmlFor={id}>{label}</label>
      </div>
      <div className="error">{error && <span>{error}</span>}</div> */}
    </Wrapper>
  );
}

export default Input;
