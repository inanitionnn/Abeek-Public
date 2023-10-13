import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { clockAnimation } from "../constants";
import { useAppSelector } from "../hooks/redux";
import MyBgColor from "../atom/myBgColor";
import MyContainer from "../atom/myContainer";
import { MyBlock } from "../atom/myBlock";
import MMyHeader, { MyHeader } from "../atom/myHeader";
import { MyParagraph } from "../atom/myParagraph";

export default function Tokens() {
  const additionalMediaTokens = useAppSelector(
    (state) => state.user.additionalMediaTokens
  );
  const mediaTokens = useAppSelector((state) => state.user.mediaTokens);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(now);

      // Задаємо час 22:00:00
      targetTime.setHours(24, 0, 0, 0);

      // Якщо цільовий час вже минув сьогодні, то встановлюємо цільовий час на завтра
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      // Вираховуємо різницю між поточним часом і цільовим часом
      const timeDifference = targetTime.getTime() - now.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = timeDifference - hours * 1000 * 60 * 60;
      const minutes = Math.floor(minutesDifference / (1000 * 60));
      const secondsDifference = minutesDifference - minutes * 1000 * 60;
      const seconds = Math.floor(secondsDifference / 1000);
      return { hours, minutes, seconds };
    };
    // Оновлюємо залишений час кожну секунду
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="md:ml-[70px] lg:ml-[190px] relative">
      <img
        src="/posters5.webp"
        alt="poster"
        className="w-full h-full fixed object-cover -z-50"
      />
      <MyBgColor>
        <MyContainer className="gap-8 justify-start">
          <MyHeader vsize={"xl"}>Tokens</MyHeader>
          <div className="flex  flex-col md:flex-row  gap-4 w-full">
            <MyBlock className="sm:flex-row sm:justify-between p-4 gap-2">
              <MyHeader vsize={"lg"} className="text-start">
                Media tokens:
              </MyHeader>
              <div className="flex  gap-1 items-center p-3 rounded-2xl bg-base-200">
                <MyHeader vsize={"lg"} className="text-start">
                  {mediaTokens} / 100
                </MyHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-10 h-10 fill-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </MyBlock>
            <MyBlock className="sm:flex-row sm:justify-between p-4 gap-2">
              <MyHeader vsize={"lg"} className="text-start">
                Additional media tokens:
              </MyHeader>
              <div className="flex gap-1 items-center p-3 rounded-2xl bg-base-200">
                <MyHeader vsize={"lg"} className="text-start">
                  {additionalMediaTokens}
                </MyHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-10 h-10 fill-success"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </MyBlock>
          </div>
          <MyBlock className="flex-row p-4 gap-2 sm:p-8 sm:gap-4">
            <div className="relative w-20 h-20">
              <AnimatePresence>
                <MMyHeader
                  key={timeLeft.hours}
                  initial="hidden"
                  animate="visible"
                  exit="end"
                  variants={clockAnimation}
                  vsize={"lg"}
                  className="flex justify-center items-center bg-base-200 rounded-2xl shadow w-20 h-20"
                >
                  {timeLeft.hours.toString().padStart(2, "0")}
                </MMyHeader>
              </AnimatePresence>
            </div>
            <p className="font-head font-bold text-lg">:</p>
            <div className="relative w-20 h-20">
              <AnimatePresence>
                <MMyHeader
                  key={timeLeft.minutes}
                  initial="hidden"
                  animate="visible"
                  exit="end"
                  variants={clockAnimation}
                  vsize={"lg"}
                  className="flex justify-center items-center bg-base-200 rounded-2xl shadow w-20 h-20"
                >
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </MMyHeader>
              </AnimatePresence>
            </div>
            <p className="font-head font-bold text-lg">:</p>
            <div className="relative w-20 h-20">
              <AnimatePresence>
                <MMyHeader
                  key={timeLeft.seconds}
                  initial="hidden"
                  animate="visible"
                  exit="end"
                  variants={clockAnimation}
                  vsize={"lg"}
                  className="flex justify-center items-center bg-base-200 rounded-2xl shadow w-20 h-20"
                >
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </MMyHeader>
              </AnimatePresence>
            </div>
          </MyBlock>
          <MyBlock>
            <MyParagraph>
              Every day at 12 pm,
              <span className="inline-block ml-3 mr-2">
                <div className="flex gap-1 items-center p-2 sm:p-3 rounded-2xl bg-base-200">
                  <MyHeader>15</MyHeader>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 fill-primary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </span>
              tokens are added to your account.
            </MyParagraph>
          </MyBlock>
        </MyContainer>
      </MyBgColor>
    </main>
  );
}
