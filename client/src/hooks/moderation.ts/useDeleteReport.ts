import { useEffect } from "react";
import {
  DeleteReportDocument,
  DeleteReportMutation,
  DeleteReportMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

type Props = {
  dataCb?: () => void;
  errorCb?: () => void;
};

const useDeleteReport = (props: Props) => {
  const { dataCb, errorCb } = props;
  const [
    deleteReportMutation,
    {
      data: deleteReportData,
      error: deleteReportError,
      loading: deleteReportLoading,
    },
  ] = useMutation<DeleteReportMutation, DeleteReportMutationVariables>(
    DeleteReportDocument
  );

  const handleDeleteReport = (reportId: string) => {
    deleteReportMutation({
      variables: {
        input: reportId,
      },
    });
  };

  useEffect(() => {
    if (deleteReportData) {
      if (dataCb) dataCb();
    }
  }, [deleteReportData]);

  useEffect(() => {
    if (deleteReportError) {
      if (errorCb) errorCb();
      toast.error(deleteReportError.message);
    }
  }, [deleteReportError]);

  return {
    handleDeleteReport,
    loading: deleteReportLoading,
  };
};

export default useDeleteReport;
