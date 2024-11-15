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
        "odd:bg-vote-card-odd even:bg-vote-card-even relative aspect-square overflow-hidden rounded-xl p-2 duration-200 hover:cursor-pointer hover:brightness-75"
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
      <p className="font-montserrat font-semibold text-white">{name}</p>
      <img
        src={image}
        draggable="false"
        className="absolute bottom-0 right-0 aspect-square translate-x-1/4 translate-y-1/4"
      />
    </div>
  );
};

export default VoteItem;
