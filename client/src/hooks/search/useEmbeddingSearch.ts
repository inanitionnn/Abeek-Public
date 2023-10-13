import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  EmbeddingSearchDocument,
  EmbeddingSearchQuery,
  EmbeddingSearchQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useAppDispatch, useAppSelector } from "../redux";
import { setSearchMediaState } from "../../redux/reducers/mediaSlice";

type Props = {
  query: string;
  count: number;
};

const useEmbeddingSearch = (props: Props) => {
  const { query, count } = props;
  const mediaType = useAppSelector((state) => state.types.mediaType);
  const dispatch = useAppDispatch();
  const [
    embedddingSearchQuery,
    {
      data: embedddingSearchData,
      loading: embedddingSearchLoading,
      error: embedddingSearchError,
    },
  ] = useLazyQuery<EmbeddingSearchQuery, EmbeddingSearchQueryVariables>(
    EmbeddingSearchDocument
  );

  const handleSearch = () => {
    if (query) {
      dispatch(setSearchMediaState(null));
      embedddingSearchQuery({
        variables: {
          input: {
            count: count,
            mediaType: mediaType,
            message: query,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (embedddingSearchData) {
      dispatch(setSearchMediaState(embedddingSearchData.embeddingSearch));
    }
  }, [embedddingSearchData]);

  useEffect(() => {
    if (embedddingSearchError) {
      toast.error(embedddingSearchError.message);
    }
  }, [embedddingSearchError]);

  return { handleSearch, loading: embedddingSearchLoading };
};

export default useEmbeddingSearch;
