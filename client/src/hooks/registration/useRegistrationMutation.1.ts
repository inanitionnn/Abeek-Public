import { useAppDispatch } from "../redux";
import { getUniqueId } from "../../utils/fingerprint";
import { setUnicId } from "../../redux/reducers/userSlice";
import { useMutation } from "@apollo/client";
import {
  RegistrationDocument,
  RegistrationInput,
  RegistrationMutation,
  RegistrationMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegistrationMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function setId() {
    dispatch(setUnicId(await getUniqueId()));
  }
  const [
    registrationMutation,
    { data: registrationData, error: registrationError },
  ] = useMutation<RegistrationMutation, RegistrationMutationVariables>(
    RegistrationDocument
  );
  useEffect(() => {
    if (registrationError) {
      toast.error(registrationError.message);
    }
  }, [registrationError]);

  useEffect(() => {
    if (registrationData) {
      toast.success("Check your email!");
      navigate("/");
    }
  }, [dispatch, registrationData]);

  const handleRegistration = (input: RegistrationInput) => {
    setId().then(() =>
      registrationMutation({
        variables: {
          input: input,
        },
      })
    );
  };

  return { handleRegistration };
};
