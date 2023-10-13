import { ComponentPropsWithoutRef, Ref, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router-dom";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import { useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";

type Props = ComponentPropsWithoutRef<"div"> & {
  mediaType: MediaEnum | null | undefined;
  mediaId: string | null | undefined;
  followId: string | null | undefined;
  handleAddMediaToUser: () => void;
  handleDeleteMedia: () => void;
  handleReport: () => void;
  handleEdit: () => void;
};

export const MediaButtons = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const navigate = useNavigate();
    const { inUserMedia, isPublic } = useAppSelector(
      (state) => state.media.getMedia
    );
    const { isLoggedIn, role } = useAppSelector((state) => state.user);
    const isModerator = role === "m" || role === "a";
    const {
      className,
      mediaType,
      mediaId,
      followId,
      handleAddMediaToUser,
      handleDeleteMedia,
      handleReport,
      handleEdit,
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        className={twMerge(
          "absolute top-3 left-3 right-3 flex justify-end flex-row-reverse md:flex-row gap-8",
          className
        )}
        {...restProps}
      >
        {isPublic && (
          <div
            className="w-9 h-9 bg-success
            rounded-full flex items-center justify-center tooltip tooltip-left"
            data-tip="This media has been checked by moderators and is available to all users"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-error-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
        )}
        {isModerator && (
          <Link to={`/moderation/edit/${mediaType}/${mediaId}`}>
            <button
              className="w-9 h-9 bg-warning
            rounded-full flex items-center justify-center tooltip tooltip-left"
              data-tip="Edit media info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-error-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            </button>
          </Link>
        )}
        {inUserMedia &&
          isLoggedIn &&
          (!followId ? (
            <button
              className="w-9 h-9  bg-info
            rounded-full flex items-center justify-center tooltip tooltip-left"
              data-tip="Edit rate, note or view stage"
              onClick={handleEdit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-error-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          ) : (
            <></>
          ))}

        {inUserMedia && isLoggedIn && followId ? (
          <button
            className="w-9 h-9  bg-info
            rounded-full flex items-center justify-center tooltip tooltip-left"
            data-tip="My media page"
            onClick={() => navigate(`/media/${mediaType}/${mediaId}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 stroke-error-content fill-error-content"
            >
              <path
                fillRule="evenodd"
                d="M14.78 14.78a.75.75 0 01-1.06 0L6.5 7.56v5.69a.75.75 0 01-1.5 0v-7.5A.75.75 0 015.75 5h7.5a.75.75 0 010 1.5H7.56l7.22 7.22a.75.75 0 010 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <></>
        )}

        {isLoggedIn && !isModerator && (
          <button
            className="w-9 h-9  bg-error
            rounded-full flex items-center justify-center tooltip tooltip-left"
            data-tip="Report an incorrect field or an incorrect image"
            onClick={handleReport}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-error-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </button>
        )}
        {isLoggedIn &&
          (inUserMedia ? (
            <button
              className="w-9 h-9  bg-primary-content   
          rounded-full flex items-center justify-center tooltip tooltip-left"
              data-tip="Delete media from your collection"
              onClick={handleDeleteMedia}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-error-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          ) : (
            <button
              className="w-9 h-9  bg-primary-content  
          rounded-full flex items-center justify-center tooltip tooltip-left"
              data-tip="Add media to your collection"
              onClick={handleAddMediaToUser}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 stroke-error-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ))}
      </div>
    );
  })
);
const MMediaButtons = motion(MediaButtons);
export default MMediaButtons;
