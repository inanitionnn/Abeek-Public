import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { IMAGE_API, slideAnimation } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  GetProfileInfoQuery,
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "../../graphql/__generated__/graphql";
import { setUserState } from "../../redux/reducers/userSlice";
import useFileUpload from "../../hooks/useFileUpload";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import MMyBlock from "../../atom/myBlock";
import MyButton from "../../atom/myButton";
import MyInput from "../../atom/myInput";
import MyHeader from "../../atom/myHeader";
import MyTextarea from "../../atom/myTextarea";
import MyLoading from "../../atom/myLoading";
import MMyContainer from "../../atom/myContainer";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  oldNote: string;
  setProfile: React.Dispatch<
    React.SetStateAction<GetProfileInfoQuery["getProfileInfo"] | undefined>
  >;
  isEdit: boolean;
};
const EditProfile = memo((props: Props) => {
  const { setIsEdit, oldNote, setProfile } = props;
  const dispatch = useAppDispatch();
  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState("");
  const [newNote, setNewNote] = useState("");
  const {
    token,
    user: { picture, name },
  } = useAppSelector((state) => state.user);
  const [
    updateUserMutation,
    {
      data: updateUserData,
      error: updateUserError,
      loading: updateUserLoading,
    },
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument
  );

  const handleSave = () => {
    if (newNote !== oldNote || newName !== oldName) {
      updateUserMutation({
        variables: {
          input: {
            name: newName !== oldName ? newName : null,
            note: newNote !== oldNote ? newNote : null,
          },
        },
      });
    }
  };
  useEffect(() => {
    setOldName(name);
    setNewName(name);
    setNewNote(oldNote || "");
  }, []);

  useEffect(() => {
    if (updateUserData) {
      if (newName !== oldName) {
        dispatch(setUserState({ name: newName }));
      }
      if (newNote !== oldNote) {
        setProfile((prev) => {
          if (!prev) return prev;
          return { ...prev, note: newNote || "" };
        });
      }
      setIsEdit(false);
    }
  }, [updateUserData]);

  useEffect(() => {
    if (updateUserError) {
      toast.error(updateUserError.message);
    }
  }, [updateUserError]);

  // image download
  const filePicker = useRef<HTMLInputElement>(null);

  const uploadCallback = (url: string) => {
    dispatch(setUserState({ picture: url }));
  };
  const { uploadFile } = useFileUpload({ cb: uploadCallback, type: "avatar" });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadFile(event.target.files[0], token);
    }
  };

  const handlePickFile = () => {
    filePicker.current?.click();
  };
  return (
    <>
      <MMyContainer
        initial="hidden"
        animate="visible"
        vwide={"md"}
        className="justify-start"
      >
        <input
          type="file"
          ref={filePicker}
          onChange={handleFileChange}
          accept="image/*,.pnh,.jpg,.gif,.webp"
          className="hidden"
        />
        <MMyBlock
          variants={slideAnimation}
          custom={0}
          className="sm:flex-row gap-8 px-6 py-6"
        >
          <div className="avatar relative">
            <MyButton
              vvariatns={"primary"}
              onClick={handlePickFile}
              className="absolute -bottom-2 -right-2 rounded-full p-3 ring-2 ring-base-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </MyButton>
            <div className="w-32  rounded-full">
              {picture ? (
                <img src={IMAGE_API + "/" + picture} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              )}
            </div>
          </div>

          <MyInput
            type="text"
            value={newName || ""}
            maxLength={55}
            className=""
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewName(event.target.value)
            }
          />
        </MMyBlock>

        <MMyBlock variants={slideAnimation} custom={2} className="relative">
          <MyHeader vsize={"lg"}>About</MyHeader>

          <MyTextarea
            rows={5}
            value={newNote || ""}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setNewNote(event.target.value)
            }
            maxLength={1020}
          ></MyTextarea>
        </MMyBlock>

        <div className="flex flex-col md:flex-row gap-8">
          {updateUserLoading ? (
            <MyLoading />
          ) : (
            <>
              <MyButton vwide={"wide"} onClick={() => setIsEdit(false)}>
                Back
              </MyButton>
              <MyButton
                vwide={"wide"}
                vvariatns={"primary"}
                onClick={handleSave}
              >
                Save
              </MyButton>
            </>
          )}
        </div>
      </MMyContainer>
    </>
  );
});

export default EditProfile;
