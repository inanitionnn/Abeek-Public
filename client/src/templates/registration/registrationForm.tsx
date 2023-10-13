import { slideAnimation } from "../../constants";
import MMyInput from "../../atom/myInput";
import { useForm } from "react-hook-form";
import { RegistrationInput } from "../../graphql/__generated__/graphql";
import MMyHeader from "../../atom/myHeader";
import { motion } from "framer-motion";
import { memo } from "react";
import { useRegistrationMutation } from "../../hooks/registration/useRegistrationMutation.1";
import { Link } from "react-router-dom";

const RegistrationForm = memo(() => {
  const { handleRegistration } = useRegistrationMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <MMyHeader custom={1} variants={slideAnimation} vsize={"xl"}>
        Registration
      </MMyHeader>
      <form
        className="flex flex-col gap-2 mt-8 mb-[2rem]"
        onSubmit={handleSubmit((data) => {
          const { agreeToPrivacyPolicy, ...formData } = data;
          handleRegistration(formData as RegistrationInput);
        })}
      >
        <motion.label
          custom={2}
          variants={slideAnimation}
          htmlFor="name"
          className="font-medium"
        >
          Name
        </motion.label>
        <MMyInput
          custom={2}
          variants={slideAnimation}
          className="input input-bordered shadow text-pro"
          id="name"
          placeholder="example"
          {...register("name", {
            required: true,
            maxLength: {
              value: 55,
              message: "max length is 55",
            },
          })}
          type="text"
        />
        {errors.name?.message ? (
          <div className="badge badge-error">
            {errors.name.message?.toString()}
          </div>
        ) : null}
        <motion.label
          custom={3}
          variants={slideAnimation}
          htmlFor="email"
          className="font-medium"
        >
          Email
        </motion.label>

        <MMyInput
          custom={3}
          variants={slideAnimation}
          className="input input-bordered shadow"
          id="email"
          placeholder="example@gmail.com"
          {...register("email", {
            required: true,
            maxLength: {
              value: 255,
              message: "max length is 255",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
        />
        {errors.email?.message ? (
          <div className="badge badge-error">
            {errors.email.message?.toString()}
          </div>
        ) : null}

        <motion.label
          custom={4}
          variants={slideAnimation}
          htmlFor="password"
          className="font-medium"
        >
          Password
        </motion.label>
        <MMyInput
          custom={4}
          variants={slideAnimation}
          className="input input-bordered w-[20rem] shadow"
          placeholder="example"
          id="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 4,
              message: "min length is 4",
            },
          })}
          type="password"
        />
        {errors.password?.message ? (
          <div className="badge badge-error">
            {errors.password.message?.toString()}
          </div>
        ) : null}
        <motion.div
          custom={5}
          variants={slideAnimation}
          className="flex items-center gap-4 w-[20rem]"
        >
          <input
            id="agreeToPrivacyPolicy"
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={watch("agreeToPrivacyPolicy")}
            onChange={(e) => setValue("agreeToPrivacyPolicy", e.target.checked)}
          />
          <label
            htmlFor="agreeToPrivacyPolicy"
            className="font-light tracking-wide leading-sm text-sm w-auto"
          >
            I have read and agree to the{" "}
            <Link to={"/policy"} className="link">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to={"/terms"} className="link">
              Terms and Conditions
            </Link>
          </label>
        </motion.div>
        {errors.agreeToPrivacyPolicy?.message ? (
          <div className="badge badge-error">
            {errors.agreeToPrivacyPolicy.message?.toString()}
          </div>
        ) : null}
        <MMyInput
          custom={6}
          variants={slideAnimation}
          className="btn btn-success bg-success shadow mt-4"
          type="submit"
          value={"Sign up"}
          disabled={!watch("agreeToPrivacyPolicy")}
        />
      </form>
    </>
  );
});

export default RegistrationForm;
