import React, { ComponentPropsWithoutRef, memo } from "react";
import { rateNames } from "../constants";
import { clsx } from "clsx";
import { MyHeader } from "./myHeader";

type Props = ComponentPropsWithoutRef<"h3"> & {
  rate: number;
  setRate: (value: number) => void;
  name?: string;
};

const MyRate = memo((props: Props) => {
  const { rate, setRate, name = "rate-main", className, ...restProps } = props;
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseInt(e.target.value, 10);
    setRate(newRate);
  };

  return (
    <div className="space-y-1">
      <div className="rating rating-lg rating-half">
        <input
          type="radio"
          name={name}
          className="rating-hidden"
          value={0}
          onChange={handleRatingChange}
          checked={rate === 0}
        />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <input
            key={value}
            type="radio"
            name={name}
            value={value}
            onChange={handleRatingChange}
            checked={rate === value}
            className={clsx({
              "bg-primary mask mask-star-2": true,
              "mask-half-2": value % 2 === 0,
              "mask-half-1": value % 2 !== 0,
            })}
          />
        ))}
      </div>
      <MyHeader className={className} {...restProps}>
        {rateNames[rate - 1]}
      </MyHeader>
    </div>
  );
});
export default MyRate;
