import { motion } from "framer-motion";
import MyContainer from "../../atom/myContainer";
import { MyBlock } from "../../atom/myBlock";
import { MyHeader } from "../../atom/myHeader";
import { MyInput } from "../../atom/myInput";
import { MyButton } from "../../atom/myButton";
import useUnban from "../../hooks/moderation.ts/useUnban";
import { useState } from "react";
import useSetRole from "../../hooks/moderation.ts/useSetRole";
import {
  GetAllUsersQuery,
  RolesEnum,
} from "../../graphql/__generated__/graphql";
import useGetAllUsers from "../../hooks/moderation.ts/useGetAllUsers";
import { IMAGE_API } from "../../constants";
import { MyParagraph } from "../../atom/myParagraph";
import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import MyBgColor from "../../atom/myBgColor";

export default function AdminPage() {
  const [users, setUsers] = useState<GetAllUsersQuery["getAllUsers"]>();
  const [unbanEmail, setUnbanEmail] = useState("");
  const [addModerEmail, setAddModerEmail] = useState("");
  const [deleteModerEmail, setDeleteModerEmail] = useState("");

  const { handleSetRole } = useSetRole({
    dataCb: () => {
      setAddModerEmail("");
      setDeleteModerEmail("");
    },
  });
  const { handleUnban } = useUnban({
    dataCb: () => {
      setUnbanEmail("");
    },
  });

  const { getUsersQuery } = useGetAllUsers({ setUsers });

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters8.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer>
            <div className="flex flex-wrap justify-center w-full gap-8">
              <MyBlock className="w-auto">
                <MyHeader vsize={"lg"}>Add moder</MyHeader>

                <MyInput
                  value={addModerEmail}
                  onChange={(event) => setAddModerEmail(event.target.value)}
                  className="min-w-[350px]"
                  placeholder="User email"
                />

                <MyButton
                  vvariatns={"primary"}
                  vwide={"wide"}
                  onClick={() =>
                    handleSetRole({
                      role: RolesEnum.Moder,
                      userEmail: addModerEmail,
                    })
                  }
                >
                  Add moder
                </MyButton>
              </MyBlock>

              <MyBlock className="w-auto">
                <MyHeader vsize={"lg"}>Delete moder</MyHeader>
                <MyInput
                  value={deleteModerEmail}
                  onChange={(event) => setDeleteModerEmail(event.target.value)}
                  className="min-w-[350px]"
                  placeholder="User email"
                />
                <MyButton
                  vvariatns={"primary"}
                  vwide={"wide"}
                  onClick={() =>
                    handleSetRole({
                      role: RolesEnum.User,
                      userEmail: deleteModerEmail,
                    })
                  }
                >
                  Delete moder
                </MyButton>
              </MyBlock>

              <MyBlock className="w-auto">
                <MyHeader vsize={"lg"}>Unban</MyHeader>
                <MyInput
                  value={unbanEmail}
                  onChange={(event) => setUnbanEmail(event.target.value)}
                  className="min-w-[350px]"
                  placeholder="User email"
                />
                <MyButton
                  vvariatns={"primary"}
                  vwide={"wide"}
                  onClick={() => handleUnban(unbanEmail)}
                >
                  Unban
                </MyButton>
              </MyBlock>

              <MyBlock className="w-auto">
                <MyHeader vsize={"lg"}>All users</MyHeader>
                <MyButton
                  vvariatns={"primary"}
                  vwide={"wide"}
                  onClick={() => {
                    getUsersQuery();
                  }}
                >
                  Get All Users
                </MyButton>
              </MyBlock>
            </div>
            {users ? (
              <MyBlock className="p-4">
                <MyHeader vsize={"lg"}>All users: {users.length}</MyHeader>
                {users?.map((user) => (
                  <Link to={`/collection/user/${user.id}`} className="w-full">
                    <MyBlock className="bg-base-200 md:flex-row justify-between p-2">
                      <div className="flex gap-4 items-center">
                        <div>
                          <img
                            src={IMAGE_API + "/" + user.picture}
                            alt=""
                            className="w-14 h-14 rounded-full"
                          />
                        </div>
                        <div>
                          <MyHeader className="text-start">
                            {user.name}
                          </MyHeader>
                          <MyParagraph className="text-start">
                            {user.email}
                          </MyParagraph>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center">
                        {user.isBanned ? (
                          <MyHeader className="ring-2 rounded-2xl px-2 py-1 ring-error">
                            Banned
                          </MyHeader>
                        ) : null}
                        {!user.canSendReport ? (
                          <MyHeader className="ring-2 rounded-2xl px-2 py-1 ring-error">
                            Report ban
                          </MyHeader>
                        ) : null}

                        <MyParagraph className="text-start">
                          Created: {timeAgo(user.createdAt)}
                        </MyParagraph>
                      </div>
                    </MyBlock>
                  </Link>
                ))}
              </MyBlock>
            ) : null}
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
