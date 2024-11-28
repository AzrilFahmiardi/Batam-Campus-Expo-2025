import { Fragment } from "react";
import Header from "../components/Header";
import CampusContainer from "../components/CampusPage/CampusContainer";
import { useAuth } from "../utils/AuthProvider";


const Kampus = () => {
  const { user, isLoggedIn, hasVoted } = useAuth();

  return (
    <Fragment>
      <Header user={user}/>
      <CampusContainer />
    </Fragment>
  );
};
export default Kampus;
