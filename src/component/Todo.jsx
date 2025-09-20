import React, { useState } from "react";
import Form from "./Form";

const Todo = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="max-w-[700px] min-w-[600px] h-[500px] relative bg-[#0c1520] rounded-[30px]">
      <h1 className="text-center text-[36px] text-[#F9FAFB]">Daily Plan</h1>
      <Form showInput={showInput} setShowInput={setShowInput} />
      <button
        className="absolute right-5 rounded-full bottom-[20px]"
        onClick={() => setShowInput(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="size-9"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
