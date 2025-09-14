import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = ({hamBurgerHandler}) => {
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue]);

  return (
    <div  className="w-full bg-white p-3 rounded-md ">
      <h1 className="text-lg font-bold -ml-12 md:-ml-0">Filter Jobs</h1>
      <hr className="md:mt-3 -ml-20 md:-ml-0" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler} onClick={hamBurgerHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mt-3">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => (
              <div className="flex items-center space-x-2 my-2" key={idx}>
                <RadioGroupItem value={item} id={`r${index}-${idx}`} />
                <Label htmlFor={`r${index}-${idx}`}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
