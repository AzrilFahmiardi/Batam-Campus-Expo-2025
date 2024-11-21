const CampusTableItem = ({ img, name, vote }) => {
  return (
    <tr>
      <td className="w-[50px] whitespace-nowrap rounded-l-xl bg-white px-3 py-2 text-center font-montserrat text-[10px] font-bold sm:p-3 sm:text-xl md:w-[60px] md:text-xl lg:w-[80px] lg:text-2xl">
        1
      </td>
      <td className="whitespace-nowrap bg-white p-2 font-montserrat sm:p-3 md:px-4 md:py-2">
        <div className="flex w-full items-center gap-2 sm:gap-3">
          <div className="h-8 w-7 flex-shrink-0 overflow-hidden sm:h-10 sm:w-10 md:h-12 md:w-12">
            <img src={img} alt={name} className="h-full w-full object-cover" />
          </div>
          <p className="flex-1 text-[11px] sm:text-sm md:text-lg">{name}</p>
        </div>
      </td>
      <td className="w-[75px] rounded-r-xl bg-white p-2 text-center font-montserrat text-[10px] font-semibold sm:w-[100px] sm:p-3 sm:text-sm md:w-[120px] md:px-2 md:py-2 md:text-lg lg:w-[150px] lg:text-xl">
        {vote} Vote
      </td>
    </tr>
  );
};
export default CampusTableItem;
