import { useEffect } from "react";
import {
  GetModerReportAccountDocument,
  GetModerReportAccountQuery,
  GetModerReportAccountQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";

type MediaGet = Exclude<
  GetModerReportAccountQuery["getModerReportAccount"],
  null | undefined
>;

type Props = {
  setReportId: React.Dispatch<
    React.SetStateAction<MediaGet["reportId"] | undefined>
  >;
  setInformerUser: React.Dispatch<
    React.SetStateAction<MediaGet["informerUser"]>
  >;
  setReportedUser: React.Dispatch<
    React.SetStateAction<MediaGet["reportedUser"]>
  >;
  dataCb?: () => void;
  errorCb?: () => void;
};

const useGetAccountReport = (props: Props) => {
  const { setInformerUser, setReportId, setReportedUser, dataCb, errorCb } =
    props;
  const {
    data: getAccountReportData,
    error: getAccountReportError,
    loading: getAccountReportLoading,
    refetch: getAccountReportRefetch,
  } = useQuery<GetModerReportAccountQuery, GetModerReportAccountQueryVariables>(
    GetModerReportAccountDocument,
    { fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    if (getAccountReportData) {
      if (dataCb) dataCb();
      const response = getAccountReportData.getModerReportAccount;
      setInformerUser(response?.informerUser);
      setReportedUser(response?.reportedUser);
      setReportId(response?.reportId);
    }
  }, [getAccountReportData]);

  useEffect(() => {
    if (getAccountReportError) {
      if (
        getAccountReportError.graphQLErrors[0].extensions.code === "NOT_FOUND"
      ) {
        if (errorCb) errorCb();
        toast.success(getAccountReportError.message);
      } else {
        toast.error(getAccountReportError.message);
      }
    }
  }, [getAccountReportError]);

  return {
    loading: getAccountReportLoading,
    refetch: getAccountReportRefetch,
  };
};

export default useGetAccountReport;
