import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";
import getToken from "./getToken";

function useFriendStatus(friendID) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const delayReady = () => {
    setReady(true);
  };
  function handleCheckToken() {
    const tkn = getToken();
    if (tkn) {
      dispatch(getUserDetails(tkn))
        .then((res) => {
          delayReady(true);
        })
        .catch((err) => {
          delayReady(true);
        });
    } else {
      delayReady(true);
    }
  }
  useEffect(() => {
    handleCheckToken();
  }, []);

  return ready;
}
export default useFriendStatus;