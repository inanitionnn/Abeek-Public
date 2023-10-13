import { useAppDispatch } from "../../hooks/redux";
import { getUniqueId } from "../../utils/fingerprint";
import { setLoginState, setUnicId } from "../../redux/reducers/userSlice";
import { useMutation } from "@apollo/client";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  LoginUserInput,
} from "../../graphql/__generated__/graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Unique id
  async function setId() {
    dispatch(setUnicId(await getUniqueId()));
  }

  // Login
  const [loginMutation, { data: loginData, error: loginError }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  const handleLogin = (input: LoginUserInput) => {
    setId().then(() =>
      loginMutation({
        variables: {
          input: input,
        },
      })
    );
  };

  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message);
    }
  }, [loginError]);

  useEffect(() => {
    if (loginData) {
      dispatch(
        setLoginState({
          user: {
            id: loginData.login.id,
            name: loginData.login.name,
            email: loginData.login.email,
            picture: loginData.login.picture || "",
          },
          token: loginData.login.token,
        })
      );
      navigate("/");
    }
  }, [dispatch, loginData]);

  return { handleLogin };
};

export default useLoginMutation;
