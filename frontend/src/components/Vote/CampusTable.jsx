const CampusTable = ({ children }) => {
  return (
    <table className="w-full table-fixed border-separate border-spacing-2 sm:border-spacing-3">
      <tbody>{children}</tbody>
    </table>
  );
};
export default CampusTable;
