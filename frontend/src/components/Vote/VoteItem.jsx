import { useState } from "react";

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
        "relative aspect-square overflow-hidden rounded-xl p-2 duration-200 odd:bg-vote-card-odd even:bg-vote-card-even hover:cursor-pointer hover:brightness-75 sm:w-full sm:p-2"
      }
    >
      <input
        type="checkbox"
        name="selectedUniv"
        value={value}
        checked={checked}
        readOnly
        className="hidden"
      />
      <div className="relative h-full">
        <p className="text-left font-montserrat text-[10px] font-semibold text-white sm:text-lg md:text-base">
          {name}
        </p>
        <img
          src={image}
          draggable="false"
          className="absolute bottom-0 right-0 aspect-square translate-x-[40%] translate-y-[40%] object-contain sm:w-full sm:translate-x-1/3 sm:translate-y-[30%]"
        />
      </div>
    </div>
  );
};

export default VoteItem;
