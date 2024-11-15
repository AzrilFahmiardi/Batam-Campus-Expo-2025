import { useState } from "react";
import contactBackground from "../../assets/images/contactBackground.png";
import contactLogo from "../../assets/images/contactLogo.png";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz1QqeTf0AO0vrefUcFOi4OSOO0oI4dJ2QmTtpsR67sEWDyo7jnKE1MPr_UDi19YPK1Og/exec",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setshowAlert(true);
    }
  };

  return (
    <div className="relative px-11 py-20">
      <img src={contactBackground} className="absolute bottom-0 left-0 -z-10" />
      <div className="grid md:grid-cols-2">
        <div className="grid place-items-center py-10 md:p-20">
          <img src={contactLogo} alt="logo batam campus expo" />
        </div>
        <div className="flex h-full flex-col gap-10 p-4">
          <p className="text-center font-pixelify text-xl text-red-800 md:text-3xl">
            Send Us a Message
          </p>
          <SubmitForm
            onSubmitForm={onSubmitForm}
            isLoading={isLoading}
            showAlert={showAlert}
            setshowAlert={setshowAlert}
          />
        </div>
      </div>
    </div>
  );
};

const SubmitForm = ({ onSubmitForm, isLoading, showAlert, setshowAlert }) => {
  if (isLoading) {
    return (
      <div className="grid size-full place-items-center">
        <div class="custom-loader"></div>
        <p className="font-montserrat font-bold text-red-800">
          Tunggu Sebentar yaaa ^_^
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col space-y-5" onSubmit={onSubmitForm}>
      {showAlert && (
        <div className="flex items-center justify-between rounded-xl bg-[#eb5e0b] px-5 py-3">
          <p className="font-montserrat text-sm font-semibold text-white">
            Pesan Kamu Berhasi Dikirim!
          </p>
          <button
            className="hover:bg grid place-items-center rounded-lg p-1 text-2xl font-bold text-white hover:bg-[rgba(158,2,2,0.7)]"
            onClick={() => setshowAlert(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.8em"
              height="0.8em"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"
                />
              </g>
            </svg>
          </button>
        </div>
      )}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="rounded-full border-4 border-red-700 px-5 py-3 font-pixelify"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="rounded-full border-4 border-red-700 px-5 py-3 font-pixelify"
      />
      <textarea
        placeholder="Detail"
        name="detail"
        id=""
        cols="30"
        rows="10"
        className="rounded-3xl border-4 border-red-700 px-5 py-3 font-pixelify"
      ></textarea>
      <button
        type="submit"
        className="rounded-full bg-orange-red-gradient py-3 font-pixelify text-lg font-semibold text-white duration-200 hover:brightness-75 md:text-xl"
      >
        Send
      </button>
    </form>
  );
};

export default Contact;
