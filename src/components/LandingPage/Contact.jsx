import contactLogo from "../../assets/images/contactLogo.png";
import contactBackground from "../../assets/images/contactBackground.png";

const Contact = () => {
  return (
    <div className="relative px-11 py-20">
      <img src={contactBackground} className="absolute bottom-0 left-0 -z-10" />
      <div className="grid md:grid-cols-2">
        <div className="grid place-items-center py-10 md:p-20">
          <img src={contactLogo} alt="logo batam campus expo" />
        </div>
        <div className="flex flex-col justify-center gap-10 p-4">
          <p className="text-center font-pixelify text-xl text-red-800 md:text-3xl">
            Send Us a Message
          </p>
          <form action="" className="flex flex-col space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="rounded-full border-4 border-red-700 px-5 py-3 font-pixelify"
            />
            <input
              type="text"
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
        </div>
      </div>
    </div>
  );
};
export default Contact;
