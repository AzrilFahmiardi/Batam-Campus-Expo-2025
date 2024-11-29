const CampusTableItem = ({ number, img, name, vote }) => {
  return (
    <tr>
      <td className="w-[30px] whitespace-nowrap rounded-l-md bg-white p-2 px-3 text-center font-montserrat text-[12px] font-bold sm:w-[50px] sm:p-3 sm:text-xl md:w-[60px] md:text-lg lg:w-[80px] lg:text-xl">
        {number}
      </td>
      <td className="w-auto whitespace-nowrap bg-white p-2 font-montserrat sm:p-3 md:px-4 md:py-2">
        <div className="flex w-full items-center gap-2 sm:gap-3">
          <div className="flex h-7 w-6 flex-shrink-0 items-center justify-center overflow-hidden sm:h-10 sm:w-10 md:h-12 md:w-12">
            <img
              src={img}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="max-w-full flex-1 truncate text-[10px] sm:text-base md:text-lg">
            {name}
          </p>
        </div>
      </td>

      <td className="w-[50px] rounded-r-xl bg-white p-2 text-center font-montserrat text-[10px] font-semibold sm:w-[110px] sm:p-3 sm:text-sm md:w-[120px] md:px-2 md:py-2 md:text-lg lg:w-[150px] lg:text-xl">
        {vote} Vote
      </td>
    </tr>
  );
};
export default CampusTableItem;
