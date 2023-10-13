import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  AddReportDocument,
  AddReportMutation,
  AddReportMutationVariables,
  MediaEnum,
  ReportEnum,
} from "../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import { useAppSelector } from "./redux";

type AddReportInput =
  | {
      reportType: ReportEnum.Account;
      userId: string | null | undefined;
    }
  | {
      reportType: ReportEnum.Media;
      mediaId: string | null | undefined;
      mediaType: MediaEnum | null | undefined;
      report: string | null | undefined;
    }
  | {
      reportType: ReportEnum.Note;
      mediaId: string | null | undefined;
      mediaType: MediaEnum | null | undefined;
      userId: string | null | undefined;
    };

type Props = {
  dataCb?: () => void;
  errorCb?: () => void;
};

const useReport = (props: Props) => {
  const { dataCb, errorCb } = props;
  const [
    addReportMutation,
    { data: addReportData, loading: addReportLoading, error: addReportError },
  ] = useMutation<AddReportMutation, AddReportMutationVariables>(
    AddReportDocument
  );
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const handleReport = (input: AddReportInput) => {
    if (!isLoggedIn) {
      toast.error("Please sign in");
    } else {
      addReportMutation({
        variables: {
          input,
        },
      });
    }
  };
  useEffect(() => {
    if (addReportData) {
      if (dataCb) dataCb();
      toast.success("The report was successfully sent");
    }
  }, [addReportData]);

  useEffect(() => {
    if (addReportError) {
      if (errorCb) errorCb();
      toast.error(addReportError.message);
    }
  }, [addReportError]);

  return { handleReport, loading: addReportLoading };
};

export default useReport;
