import { Fragment } from "react";
import Header from "../components/Header";
import CampusContainer from "../components/CampusPage/CampusContainer";
import { useAuth } from "../utils/AuthProvider";
import Footer from "../components/Footer";

const Kampus = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();

  return (
    <Fragment>
      <Header user={user} />
      <CampusContainer />
      <Footer />
    </Fragment>
  );
};
export default Kampus;
