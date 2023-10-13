import { useQuery } from "@apollo/client";
import {
  GetModerMediaCountDocument,
  GetModerMediaCountQuery,
  GetModerMediaCountQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { MyContainer } from "../../atom/myContainer";
import { MyBlock } from "../../atom/myBlock";
import { MyHeader } from "../../atom/myHeader";
import MyBgColor from "../../atom/myBgColor";

type ReportsCount = {
  newMedia: number;
  accountReport: number;
  noteReport: number;
  mediaReport: number;
};

export default function Moderation() {
  const userRole = useAppSelector((state) => state.user.role);
  const isAdnim = userRole === "a";

  const [reportsСount, setReportsCount] = useState<ReportsCount | null>(null);
  const { data: moderMediaCountData, error: moderMediaCountError } = useQuery<
    GetModerMediaCountQuery,
    GetModerMediaCountQueryVariables
  >(GetModerMediaCountDocument, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (moderMediaCountData) {
      const media = moderMediaCountData.getModerMediaCount;
      setReportsCount({
        accountReport: media?.reportsCount?.account || 0,
        mediaReport: media?.reportsCount?.media || 0,
        newMedia: media?.mediaCount || 0,
        noteReport: media?.reportsCount?.note || 0,
      });
    }
  }, [moderMediaCountData]);

  useEffect(() => {
    if (moderMediaCountError) {
      toast.error(moderMediaCountError.message);
    }
  }, [moderMediaCountError]);

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters4.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer vwide={"lg"} className="justify-start">
            <MyBlock className="bg-base-200">
              <MyHeader
                vsize={"lg"}
                className="text-center text-lg font-bold font-head"
              >
                How to moderate
              </MyHeader>
              {/* <MyParagraph className="max-w-[500px] text-start">
              In the "New media" section, you have to check for prohibited
              content. If the media is well filled, then add it to public.
            </MyParagraph>
            <MyParagraph className="max-w-[500px] text-start">
              In "Reports" section, you need to check and fix the errors
              reported by the user.
            </MyParagraph> */}
            </MyBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
              <Link to={"media"}>
                <MyBlock
                  className="flex-row h-full bg-base-200
              hover:scale-105 transition duration-300 ease-out"
                >
                  <MyHeader vsize={"lg"}>New media</MyHeader>
                  {reportsСount?.newMedia ? (
                    <div className="rounded-full bg-primary w-14 h-14 flex justify-center items-center">
                      <MyHeader vsize={"lg"}>{reportsСount?.newMedia}</MyHeader>
                    </div>
                  ) : null}
                </MyBlock>
              </Link>
              <Link to={"reports/account"}>
                <MyBlock
                  className="flex-row h-full bg-base-200
              hover:scale-105 transition duration-300 ease-out"
                >
                  <MyHeader vsize={"lg"}>Account reports</MyHeader>
                  {reportsСount?.accountReport ? (
                    <div className="rounded-full bg-primary w-14 h-14 flex justify-center items-center">
                      <MyHeader vsize={"lg"}>
                        {reportsСount?.accountReport}
                      </MyHeader>
                    </div>
                  ) : null}
                </MyBlock>
              </Link>
              <Link to={"reports/media"}>
                <MyBlock
                  className="flex-row h-full bg-base-200
              hover:scale-105 transition duration-300 ease-out"
                >
                  <MyHeader vsize={"lg"}>Media reports</MyHeader>
                  {reportsСount?.mediaReport ? (
                    <div className="rounded-full bg-primary w-14 h-14 flex justify-center items-center">
                      <MyHeader vsize={"lg"}>
                        {reportsСount?.mediaReport}
                      </MyHeader>
                    </div>
                  ) : null}
                </MyBlock>
              </Link>
              <Link to={"reports/note"}>
                <MyBlock
                  className="flex-row h-full bg-base-200
              hover:scale-105 transition duration-300 ease-out"
                >
                  <MyHeader vsize={"lg"}>Note reports</MyHeader>
                  {reportsСount?.noteReport ? (
                    <div className="rounded-full bg-primary w-14 h-14 flex justify-center items-center">
                      <MyHeader vsize={"lg"}>
                        {reportsСount?.noteReport}
                      </MyHeader>
                    </div>
                  ) : null}
                </MyBlock>
              </Link>
              {isAdnim && (
                <>
                  <Link to={"admin"}>
                    <MyBlock
                      className="flex-row h-full bg-base-200
                hover:scale-105 transition duration-300 ease-out"
                    >
                      <MyHeader vsize={"lg"}>Admin page</MyHeader>
                    </MyBlock>
                  </Link>
                </>
              )}
            </div>
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
