import { memo } from "react";
import MyHeader from "../atom/myHeader";
import { Link } from "react-router-dom";
import MyParagraph from "../atom/myParagraph";

const FooterBlock = memo(() => {
  return (
    <div className="bg-base-200 w-full p-8 flex flex-col justify-center gap-8 rounded-t-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-12 xl:justify-around xl:px-40">
        <div className="flex flex-col items-start justify-center sm:gap-4 gap-2">
          <MyHeader className="text-start">
            This site was made by one person.
          </MyHeader>
          <div className="flex items-center gap-2">
            <MyHeader className="text-start">
              I hope you find it useful
            </MyHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-5 h-5 fill-primary"
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <MyHeader className="text-start">Contact Information:</MyHeader>

          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#4caf50"
                d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
              />
              <path
                fill="#1e88e5"
                d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
              />
              <polygon
                fill="#e53935"
                points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
              />
              <path
                fill="#c62828"
                d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
              />
              <path
                fill="#fbc02d"
                d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
              />
            </svg>
            <div className="flex flex-col items-start gap-0">
              <MyParagraph className="text-start">
                Work email: tarolv.work@gmail.com
              </MyParagraph>
              <MyParagraph className="text-start">
                Site email: tarolv3@gmail.com
              </MyParagraph>
            </div>
          </div>

          <Link
            to={"https://t.me/inanition"}
            className=" flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              className="w-5 h-5 fill-info"
            >
              <path d="M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z" />
            </svg>
            <MyParagraph className="text-start">
              Telegram: @inanitionnn
            </MyParagraph>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={"/terms"}>
            <MyParagraph className="text-start link">
              Terms and Conditions
            </MyParagraph>
          </Link>

          <Link to={"/policy"}>
            <MyParagraph className="text-start link">
              Privacy Policy
            </MyParagraph>
          </Link>
        </div>
      </div>
      <MyParagraph>© inanitionnn 2023</MyParagraph>
    </div>
  );
});

export default FooterBlock;
