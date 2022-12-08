import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NewResource.css";

type NewResourceProps = {
  onAddResource: (todoText: string) => void;
};

const NewResource: React.FC<NewResourceProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const resourceSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (textInputRef.current == null || textInputRef.current.value === "") {
      alert("Cannot enter empty string");
      return;
    }

    const enteredText = textInputRef.current!.value;
    props.onAddResource(enteredText);
    textInputRef.current.value = "";
    navigate("/resources");
  };

  return (
    <form onSubmit={resourceSubmitHandler}>
      <div className="form-control">
        <label>Resource name: </label>
        <input type="text" ref={textInputRef} />
      </div>
      <button type="submit" style={{ marginRight: 5 }}>
        ADD
      </button>
      <Link
        to={{
          pathname: `/resources`,
        }}
      >
        <CancelButton></CancelButton>
      </Link>
    </form>
  );
};

export default NewResource;

function CancelButton() {
  return <button>CANCEL</button>;
}
