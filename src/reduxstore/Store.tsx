import React, { useCallback, useMemo, useReducer } from "react";

const Store = () => {
  const employees = [
    {
      id: 1,
      name: "Ramesh",
      age: 25,
      score: 0.02,
      salary: 9000,
    },
    {
      id: 3,
      name: "merish",
      age: 25,
      score: 0.02,
      salary: 6000,
    },
    {
      id: 7,
      name: "kamesh",
      age: 25,
      score: 0.02,
      salary: 500,
    },
  ];

  const reducer = (state: number, action: string) => {
    if (action === "increment") {
      return state + 1;
    }
    if (action == "decrement") {
      return state - 1;
    }
    if (action == "multiplication") {
      return state * 1;
    }
    if (action == "division") {
      return state / 1;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, 0);
  const handleclick = () => {
    console.log("clicked me");
    employees[0].salary = employees[0].salary + 20000;
    console.log(employees[0].salary);
  };

  const efficiency = useCallback(() => {
    return employees.map((employee) => employee.salary * employee.score);
  }, [employees[0].salary]);
  const efficiency_ = useMemo(() => {
    return employees.map((employees) => employees.salary * employees.score);
  }, [employees[0].salary]);
  return (
    <div>
      <div>{state}</div>
      <button onClick={() => handleclick()}>click</button>
      <button onClick={() => dispatch("increment")}>increment</button>
      <button onClick={() => dispatch("decrement")}>decrement</button>
      <button onClick={() => dispatch("multiplication")}>multiplication</button>
      <button onClick={() => dispatch("division")}>division</button>
      <div>{efficiency()}</div>
      <div>{efficiency_}</div>
    </div>
  );
};

export default Store;
