import React, { useEffect, useState } from "react";

const Form = ({ showInput, setShowInput }) => {
  const [value, setValue] = useState({
    id: "",
    content: "",
    checked: "",
  });
  const [task, setTask] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handleInput = (value) => {
    setValue({ id: value, content: value, checked: false });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, content, checked } = value;
    if (!content) {
      setShowInput(false);
      return;
    }
    const matched = task.find((curr) => curr.content === content);
    if (matched) {
      setShowInput(false);
      setValue("");
      return;
    }

    setTask((prev) => [...prev, { id, content, checked }]);
    setValue("");
    setShowInput(false);
  };
  const done = (content) => {
    const newTask = task.filter((curr) => curr.content !== content);
    setTask(newTask);
  };
  const lineThrough = (id) => {
    setTask((prev) =>
      prev.map((curr) =>
        curr.id === id ? { ...curr, checked: !curr.checked } : curr
      )
    );
  };

  return (
    <div className="">
      <form
        action=""
        className="flex justify-center flex-col w-full h-[100%] relative"
        onSubmit={handleSubmit}
      >
        {showInput && (
          <div className="w-[400px] absolute left-1/2 -translate-x-1/2 top-[20%]">
            <div className="relative" id="input">
              <textarea
                className="bg-[#a7a7a7a8] w-[400px] text-[24px]  h-[200px] p-[10px] focus:outline-none rounded-[20px]"
                value={value.content}
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              ></textarea>
              <button
                type="submit"
                className="absolute bottom-[10px] right-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="overflow-y-auto scrollbar-thin h-[380px] mt-[10px]">
          <ul className="flex flex-col justify-center items-center gap-[10px]">
            {task.map((elem) => {
              return (
                <li
                  key={elem.id}
                  className="ml-[10px] w-[450px] px-[10px] py-[13px] text-[20px] font-semibold  bg-[#ffffffca] rounded-[25px] shadow-input"
                >
                  <div
                    className={` flex justify-between items-center text-black${
                      elem.checked ? " line-through text-black" : " "
                    }`}
                  >
                    {elem.content}
                    <div className=" flex items-center">
                      <button onClick={() => lineThrough(elem.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="text-black"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button onClick={() => done(elem.content)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="text-black"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Form;
