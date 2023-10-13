import { useEffect } from "react";
import {
  AddRoleDocument,
  AddRoleMutation,
  AddRoleMutationVariables,
  AddRoleUserInput,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

type Props = {
  dataCb?: () => void;
  errorCb?: () => void;
};

const useSetRole = (props: Props) => {
  const { dataCb, errorCb } = props;
  const [
    roleMutation,
    { data: roleData, error: roleError, loading: roleLoading },
  ] = useMutation<AddRoleMutation, AddRoleMutationVariables>(AddRoleDocument);

  const handleSetRole = (input: AddRoleUserInput) => {
    roleMutation({
      variables: {
        input,
      },
    });
  };

  useEffect(() => {
    if (roleData) {
      if (dataCb) dataCb();
      toast.success("Successfully add role to user");
    }
  }, [roleData]);

  useEffect(() => {
    if (roleError) {
      if (errorCb) errorCb();
      toast.error(roleError.message);
    }
  }, [roleError]);

  return {
    handleSetRole,
    loading: roleLoading,
  };
};

export default useSetRole;
