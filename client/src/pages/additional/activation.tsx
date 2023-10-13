import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setLoginState, setUnicId } from "../../redux/reducers/userSlice";
import { getUniqueId } from "../../utils/fingerprint";
import {
  ActivateDocument,
  ActivateMutation,
  ActivateMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export default function Activation() {
  const navigate = useNavigate();
  const { link } = useParams();
  const dispatch = useAppDispatch();
  // Login
  const [
    activateMutation,
    { data: activateData, loading: activateLoading, error: activateError },
  ] = useMutation<ActivateMutation, ActivateMutationVariables>(
    ActivateDocument
  );

  // Unique id
  async function setId() {
    dispatch(setUnicId(await getUniqueId()));
  }

  // fetch
  useEffect(() => {
    let isMounted = true;

    setId().then(() => {
      if (isMounted) {
        activateMutation({
          variables: {
            input: link || "",
          },
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [link, activateMutation]);

  useEffect(() => {
    if (activateData) {
      dispatch(
        setLoginState({
          user: {
            id: activateData.activate.id,
            name: activateData.activate.name,
            email: activateData.activate.email,
            picture: activateData.activate.picture || "",
          },
          token: activateData.activate.token,
        })
      );
      toast.success("Successfully activated");
      navigate("/");
    }
  }, [dispatch, activateData]);

  useEffect(() => {
    if (activateError) {
      toast.error(activateError.message);
      navigate("/");
    }
  }, [activateError]);

  return (
    <>
      <div className="ml-[60px] lg:ml-[190px]">
        <div className="max-w-[860px] mx-auto h-screen flex items-center justify-center px-[40px]">
          {activateLoading && (
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-head font-bold text-lg">
                Account activation...
              </h1>
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          )}
          {activateData && (
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-head font-bold text-lg ">
                Your account has been successfully activated
              </h1>
              <button
                onClick={() => navigate("/collection")}
                className="btn btn-primary"
              >
                My collection
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
