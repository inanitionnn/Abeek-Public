import React, { useEffect } from "react";
import {
  GetAllUsersDocument,
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";

type Props = {
  setUsers: React.Dispatch<
    React.SetStateAction<GetAllUsersQuery["getAllUsers"] | undefined>
  >;
};

const useGetAllUsers = (props: Props) => {
  const { setUsers } = props;

  const [
    getUsersQuery,
    { data: getUsersData, error: getUsersError, loading: getUsersLoading },
  ] = useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (getUsersData) {
      setUsers(getUsersData.getAllUsers);
      toast.success("Warning successfully ban user");
    }
  }, [getUsersData]);

  useEffect(() => {
    if (getUsersError) {
      toast.error(getUsersError.message);
    }
  }, [getUsersError]);

  return {
    getUsersQuery,
    loading: getUsersLoading,
  };
};

export default useGetAllUsers;
