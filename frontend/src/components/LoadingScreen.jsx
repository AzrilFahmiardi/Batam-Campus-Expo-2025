import bacampex from "../assets/images/bacampex.png";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate__animated animate__infinite animate__pulse space-y-5">
        <img
          src={bacampex}
          alt="Batam Campus Expo"
          className="size-32 md:size-64"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
