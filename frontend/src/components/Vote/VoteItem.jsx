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
        <p className="text-left font-montserrat text-[8px] font-semibold text-white sm:text-[12px] md:text-[12px] xl:text-base">
          {name}
        </p>
        <img
          src={image}
          draggable="false"
          className="absolute bottom-0 right-0 aspect-square translate-x-8 translate-y-6 object-contain sm:w-[120px] sm:translate-x-10 sm:translate-y-9 md:w-full md:translate-x-1/3 md:translate-y-[30%]"
        />
      </div>
    </div>
  );
};

export default VoteItem;
