import MyBlock from "../../atom/myBlock";
import { Link } from "react-router-dom";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import MyButton from "../../atom/myButton";
import clsx from "clsx";
import { IMAGE_API } from "../../constants";
import { memo } from "react";
import { GetModerReportMediaQuery } from "../../graphql/__generated__/graphql";

type Props = {
  user: Exclude<
    GetModerReportMediaQuery["getModerReportMedia"],
    null | undefined
  >["creator"];
  handleWarningButton: () => void;
  handleBanReportsButton?: () => void;
  handleBanButton: () => void;
};

const ModerUserModule = memo((props: Props) => {
  const { user, handleWarningButton, handleBanReportsButton, handleBanButton } =
    props;

  return (
    <MyBlock>
      <div className="flex flex-col md:flex-row justify-center gap-8 w-full">
        <Link
          to={`/collection/user/${user?.id}`}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-base-200">
            {user?.picture ? (
              <img
                src={IMAGE_API + "/" + user?.picture}
                className="rounded-full"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            )}
          </div>

          <MyHeader className="max-w-[150px] break-words">
            {user?.name}
          </MyHeader>
        </Link>
        {user?.note ? (
          <MyBlock className="bg-base-200 items-start p-4">
            <MyParagraph className="line-clamp-4 break-all">
              {user?.note}
            </MyParagraph>
          </MyBlock>
        ) : null}
      </div>
      {user?.warnings?.length ? (
        <MyBlock className="border border-dashed border-warning bg-base-300 p-4 gap-2">
          <MyHeader>User old warnings</MyHeader>
          {user?.warnings?.map((warning, index) => (
            <MyParagraph>
              {index + 1}. {warning}
            </MyParagraph>
          ))}
        </MyBlock>
      ) : null}

      {!user?.canSendReport ? (
        <MyBlock className="border border-dashed border-error bg-base-300 p-4 gap-2">
          <div>
            <MyHeader>Has report ban</MyHeader>
            <MyParagraph>Can`t send new reports</MyParagraph>
          </div>
        </MyBlock>
      ) : null}
      {user?.isBanned ? (
        <MyBlock className="border border-dashed border-error bg-base-300 p-4 gap-2">
          <MyHeader>Has ban</MyHeader>
        </MyBlock>
      ) : null}
      {!user?.isBanned ? (
        <div className="flex justify-center flex-wrap gap-4 mt-4">
          <MyButton
            vwide={"wide"}
            vvariatns={"warning"}
            onClick={handleWarningButton}
          >
            Add Warning
          </MyButton>
          {handleBanReportsButton && user?.canSendReport ? (
            <MyButton
              vwide={"wide"}
              vvariatns={"error"}
              className={clsx({
                "btn-disabled": !user?.warnings?.length,
              })}
              onClick={handleBanReportsButton}
            >
              Ban Reports
            </MyButton>
          ) : null}
          <MyButton
            vwide={"wide"}
            vvariatns={"error"}
            className={clsx({
              "btn-disabled": !user?.warnings?.length,
            })}
            onClick={handleBanButton}
          >
            Ban
          </MyButton>
        </div>
      ) : null}
    </MyBlock>
  );
});

export default ModerUserModule;
