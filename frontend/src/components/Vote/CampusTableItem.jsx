const CampusTableItem = ({ img, name, vote }) => {
  return (
    <tr>
      <td className="whitespace-nowrap rounded-l-xl bg-white px-4 py-2 text-center font-montserrat text-lg font-bold">
        1
      </td>
      <td className="bg-white px-4 py-2 font-montserrat text-sm md:text-lg">
        <div className="flex w-full items-center justify-items-center gap-3">
          <img src={img} alt={name} className="max-h-10 md:max-h-12" />
          <p className="flex-1">{name}</p>
        </div>
      </td>
      <td className="w-0 rounded-r-xl bg-white px-3 text-center font-montserrat text-sm font-bold md:whitespace-nowrap md:text-lg">
        {vote} Vote
      </td>
    </tr>
  );
};
export default CampusTableItem;
