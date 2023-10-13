import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DownloadFileByLinkDocument,
  DownloadFileByLinkQuery,
  DownloadFileByLinkQueryVariables,
  ImageParseDocument,
  ImageParseQuery,
  ImageParseQueryVariables,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setImagesLoadingState,
  setSelectedImageState,
} from "../../redux/reducers/addPageSlice";
import CreateImagesSkeleton from "../../molecules/skeletons/createImagesSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGE_API, slideAnimation } from "../../constants";
import useFileUpload from "../../hooks/useFileUpload";
import MyButton from "../../atom/myButton";
import MyPrice from "../../atom/myPrice";
import MyLoading from "../../atom/myLoading";
import MyInput from "../../atom/myInput";

const ImagesParse = memo(() => {
  const dispatch = useAppDispatch();

  const { mediaType } = useAppSelector((state) => state.types);
  const parseMedia = useAppSelector((state) => state.media.parseMedia);
  const { imagesLoading, selectedImage } = useAppSelector((state) => state.add);
  const { token } = useAppSelector((state) => state.user);

  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState<string>("");

  const filePicker = useRef<HTMLInputElement>(null);

  const setSelectedImage = (imageLink: string) => {
    dispatch(setSelectedImageState(imageLink));
  };

  // download file by FILE
  const uploadCallback = (url: string) => {
    const newUrl = IMAGE_API + "/" + url;
    setImages((prev) => [newUrl, ...prev]);
    setSelectedImage(newUrl);
  };
  const { uploadFile } = useFileUpload({ cb: uploadCallback, type: "media" });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadFile(event.target.files[0], token);
    }
  };

  const handlePickFile = () => {
    filePicker.current?.click();
  };

  // download file by LINK
  const [
    downloadFileByLinkQuery,
    {
      data: downloadFileByLinkData,
      loading: downloadFileByLinkLoading,
      error: downloadFileByLinkError,
    },
  ] = useLazyQuery<DownloadFileByLinkQuery, DownloadFileByLinkQueryVariables>(
    DownloadFileByLinkDocument
  );

  const handleImageInput = (link: string) => {
    if (link) {
      downloadFileByLinkQuery({
        variables: {
          input: link,
        },
      });
    }
  };

  useEffect(() => {
    if (downloadFileByLinkData) {
      const link =
        IMAGE_API + "/" + downloadFileByLinkData.downloadFileByLink.link;
      setTimeout(() => {
        setSelectedImage(link);
        setImageInput("");
        setImages((prev) => [link, ...prev]);
      }, 100);
    }
  }, [downloadFileByLinkData]);

  useEffect(() => {
    if (downloadFileByLinkError) {
      toast.error(downloadFileByLinkError.message);
    }
  }, [downloadFileByLinkError]);

  // parse images
  const [
    imageParseQuery,
    {
      data: imageParseData,
      loading: imageParseLoading,
      error: imageParseError,
    },
  ] = useLazyQuery<ImageParseQuery, ImageParseQueryVariables>(
    ImageParseDocument
  );

  const handleParseButton = () => {
    if (parseMedia.title) {
      imageParseQuery({
        variables: {
          input: {
            mediaType: mediaType,
            query: `${parseMedia.title}`,
            count: 20,
          },
        },
      });
    }
  };

  useEffect(() => {
    async function fetchImages(imageArray: string[]): Promise<void> {
      try {
        for (const imageUrl of imageArray) {
          const response = await fetch(imageUrl);

          if (response.ok) {
            setImages((prev) => [imageUrl, ...prev]);
            dispatch(setImagesLoadingState(false));
          }
        }
      } catch (err) {
        dispatch(setImagesLoadingState(false));
      }
    }
    if (imageParseData) {
      fetchImages(imageParseData.imageParse.links || []);
    }
  }, [imageParseData]);

  useEffect(() => {
    if (imageParseError) {
      toast.error(imageParseError.message);
      dispatch(setImagesLoadingState(false));
    }
  }, [imageParseError]);

  useEffect(() => {
    if (imageParseLoading) {
      dispatch(setImagesLoadingState(true));
    }
  }, [imageParseLoading]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-8">
        {/* <div className="divider mx-16 text-base">Select poster</div> */}
        {imagesLoading && <CreateImagesSkeleton />}
        <AnimatePresence>
          {!imagesLoading && (
            <>
              <motion.div
                variants={slideAnimation}
                custom={0}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-8"
              >
                <MyInput
                  type="text"
                  value={imageInput}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setImageInput(event.target.value);
                  }}
                  onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                    if (event.key === "Enter") {
                      handleImageInput(imageInput);
                    }
                  }}
                  placeholder={`${
                    mediaType === MediaEnum.Film
                      ? "https://shekfans.com/images/best-shek-poster.jpg"
                      : mediaType === MediaEnum.Series
                      ? "https://breakingbadfans.com/images/best-breaking-bad-poster.jpg"
                      : mediaType === MediaEnum.Comics
                      ? "https://onepiecefans.com/images/best-one-piece-cover.jpg"
                      : mediaType === MediaEnum.Book
                      ? "https://kafkafans.com/images/best-metamorphosis-cover.jpg"
                      : ""
                  }`}
                />

                <MyButton
                  vwide={"wide"}
                  className="sm:w-auto"
                  onClick={() => handleImageInput(imageInput)}
                >
                  Add
                </MyButton>
              </motion.div>
              {downloadFileByLinkLoading && <MyLoading />}

              <div className="flex flex-wrap items-center justify-center gap-4 px-4 sm:px-8 sm:gap-8 lg:gap-4">
                <MyButton
                  className="flex justify-center group drop-shadow-md
                  items-center  border-[3px] w-[70px] h-[105px] 
                  lg:h-[120px] lg:w-[80px]"
                  onClick={handlePickFile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6 stroke-base-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </MyButton>
                {images.map((link) => (
                  <motion.img
                    variants={slideAnimation}
                    src={link}
                    alt="cover"
                    key={link}
                    className={`left-0 w-[70px] h-[105px] rounded-lg contrast-[0.9] 
            drop-shadow-md lg:h-[120px] lg:w-[80px] object-cover cursor-pointer 
            ${selectedImage === link ? "ring ring-3 ring-primary" : ""}`}
                    onClick={() => setSelectedImage(link)}
                  />
                ))}
                <MyButton
                  vvariatns={"primary"}
                  className="flex justify-center group drop-shadow-md
                  items-center  border-[3px] w-[70px] h-[105px] 
                  lg:h-[120px] lg:w-[80px] "
                  onClick={handleParseButton}
                >
                  Parse images
                  <MyPrice price={8} />
                </MyButton>
              </div>
            </>
          )}
        </AnimatePresence>
        <input
          type="file"
          ref={filePicker}
          onChange={handleFileChange}
          accept="image/*,.pnh,.jpg,.gif,.webp"
          className="hidden"
        />
      </div>
    </>
  );
});
export default ImagesParse;
