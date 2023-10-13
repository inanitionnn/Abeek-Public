import { useEffect } from "react";
import {
  GetModerReportNoteDocument,
  GetModerReportNoteQuery,
  GetModerReportNoteQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";

type GetMedia = Exclude<
  GetModerReportNoteQuery["getModerReportNote"],
  null | undefined
>;

type Props = {
  setMediaId: React.Dispatch<React.SetStateAction<GetMedia["mediaId"]>>;
  setInformerUser: React.Dispatch<
    React.SetStateAction<GetMedia["informerUser"]>
  >;
  setNote: React.Dispatch<React.SetStateAction<GetMedia["note"]>>;
  setReportId: React.Dispatch<
    React.SetStateAction<GetMedia["reportId"] | undefined>
  >;
  setReportedUser: React.Dispatch<
    React.SetStateAction<GetMedia["reportedUser"]>
  >;
  dataCb?: () => void;
  errorCb?: () => void;
};

const useGetNoteReport = (props: Props) => {
  const {
    setInformerUser,
    setMediaId,
    setNote,
    setReportId,
    setReportedUser,
    dataCb,
    errorCb,
  } = props;
  const {
    data: getNoteReportData,
    error: getNoteReportError,
    loading: getNoteReportLoading,
    refetch: getNoteReportRefetch,
  } = useQuery<GetModerReportNoteQuery, GetModerReportNoteQueryVariables>(
    GetModerReportNoteDocument,
    { fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    if (getNoteReportData) {
      const response = getNoteReportData.getModerReportNote;
      if (dataCb) dataCb();

      setInformerUser(response?.informerUser);
      setMediaId(response?.mediaId);
      setNote(response?.note);
      setReportId(response?.reportId);
      setReportedUser(response?.reportedUser);
    }
  }, [getNoteReportData]);

  useEffect(() => {
    if (getNoteReportError) {
      if (getNoteReportError.graphQLErrors[0].extensions.code === "NOT_FOUND") {
        if (errorCb) errorCb();
        toast.success(getNoteReportError.message);
      } else {
        toast.error(getNoteReportError.message);
      }
    }
  }, [getNoteReportError]);

  return {
    loading: getNoteReportLoading,
    refetch: getNoteReportRefetch,
  };
};

export default useGetNoteReport;
