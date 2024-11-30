import { useState } from "react";
import Chosen from "../../assets/images/Voting/chosen.png";

const VoteItem = ({
  image,
  name,
  value,
  selectedCount,
  setSelectedCount,
  setIsMax,
}) => {
  const [checked, setChecked] = useState(false);
  const checkedClass = checked ? "brightness-50 " : "";
  return (
    <div
  onClick={() => {
    if (checked || selectedCount < 5) {
      setChecked(!checked);
      setSelectedCount((prevCount) => prevCount + (checked ? -1 : 1));
    } else {
      setIsMax(true);
    }
  }}
  className={
    checkedClass +
    "relative flex items-center justify-center aspect-square w-full h-auto overflow-hidden rounded-md p-2 duration-200 odd:bg-white even:bg-white hover:cursor-pointer hover:brightness-75"
  }
>
  {/* input untuk FormData */}
  {checked && (
    <input
      type="hidden"
      name="selectedUniversities"
      value={value}
    />
  )}
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex items-center justify-center h-[75%] w-full p-1">
      <img
        src={image}
        draggable="false"
        className="max-h-full max-w-full object-contain"
        alt={name}
      />
    </div>
    <div className="flex items-center justify-center h-[30%] w-full">
      <p className="text-center font-montserrat text-[5px] font-bold leading-tight sm:text-[6px] md:text-[7px] lg:text-[9px]">
        {name}
      </p>
    </div>
  </div>

  {checked && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      <img src={Chosen} className="w-2/3 object-contain md:w-[40%]" />
    </div>
  )}
</div>
  );
};

export default VoteItem;
