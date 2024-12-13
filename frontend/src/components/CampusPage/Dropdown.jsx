import React from "react";
import Select from "react-select";

const Dropdown = ({ onSelect }) => {
  const provinces = [
    { value: "Semua Lokasi", label: "Semua Lokasi" },
    // { value: 'Aceh', label: 'Aceh' },
    // { value: 'Sumatera Utara', label: 'Sumatera Utara' },
    { value: "Sumatera Barat", label: "Sumatera Barat" },
    { value: "Riau", label: "Riau" },
    // { value: 'Kepulauan Riau', label: 'Kepulauan Riau' },
    // { value: 'Jambi', label: 'Jambi' },
    { value: "Sumatera Selatan", label: "Sumatera Selatan" },
    // { value: 'Kepulauan Bangka Belitung', label: 'Kepulauan Bangka Belitung' },
    // { value: 'Bengkulu', label: 'Bengkulu' },
    // { value: 'Lampung', label: 'Lampung' },
    // { value: 'DKI Jakarta', label: 'DKI Jakarta' },
    // { value: 'Banten', label: 'Banten' },
    { value: "Jawa Barat", label: "Jawa Barat" },
    { value: "Jawa Tengah", label: "Jawa Tengah" },
    { value: "DI Yogyakarta", label: "DI Yogyakarta" },
    { value: "Jawa Timur", label: "Jawa Timur" },
    // { value: 'Bali', label: 'Bali' },
    // { value: 'Nusa Tenggara Barat', label: 'Nusa Tenggara Barat' },
    // { value: 'Nusa Tenggara Timur', label: 'Nusa Tenggara Timur' },
    // { value: 'Kalimantan Barat', label: 'Kalimantan Barat' },
    // { value: 'Kalimantan Tengah', label: 'Kalimantan Tengah' },
    // { value: 'Kalimantan Selatan', label: 'Kalimantan Selatan' },
    // { value: 'Kalimantan Timur', label: 'Kalimantan Timur' },
    // { value: 'Kalimantan Utara', label: 'Kalimantan Utara' },
    // { value: 'Sulawesi Utara', label: 'Sulawesi Utara' },
    // { value: 'Gorontalo', label: 'Gorontalo' },
    // { value: 'Sulawesi Tengah', label: 'Sulawesi Tengah' },
    // { value: 'Sulawesi Barat', label: 'Sulawesi Barat' },
    { value: "Sulawesi Selatan", label: "Sulawesi Selatan" },
    // { value: 'Sulawesi Tenggara', label: 'Sulawesi Tenggara' },
    // { value: 'Maluku', label: 'Maluku' },
    // { value: 'Maluku Utara', label: 'Maluku Utara' },
    // { value: 'Papua', label: 'Papua' },
    // { value: 'Papua Barat', label: 'Papua Barat' }
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "1.5rem",
      backgroundImage: "linear-gradient(to right, #9E0202, #EB5E0B)",
      borderColor: "transparent",
      fontFamily: "Montserrat",
      color: "#fff",
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
      },
      padding: "2px 5px",
      width: "320px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#9E0202"
        : state.isFocused
          ? "#bd8f75"
          : "white",
      color: state.isSelected || state.isFocused ? "white" : "#374151",
      cursor: "pointer",
      fontFamily: "Montserrat",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Montserrat",
      textAlign: "left",
      padding: "0px 10px"
       
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Montserrat",
      padding: "0px 10px"

    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff",
      fontFamily: "Montserrat",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      marginTop: "4px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      fontFamily: "Montserrat",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleChange = (selectedOption) => {
    onSelect(selectedOption.value);
  };

  return (
    <div data-aos="zoom-in" data-aos-duration="1000" className="relative">
      <Select
        defaultValue={provinces[0]}
        options={provinces}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={true}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        classNames={{
          container: () => "w-full",
        }}
      />
    </div>
  );
};

export default Dropdown;
