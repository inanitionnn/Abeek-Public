import { Link } from "react-router-dom";
import { slideAnimation } from "../../constants";
import MMyParagraph from "../../atom/myParagraph";
import MMyInput from "../../atom/myInput";
import { LoginUserInput } from "../../graphql/__generated__/graphql";
import MMyHeader from "../../atom/myHeader";
import { motion } from "framer-motion";
import { memo } from "react";
import { useForm } from "react-hook-form";
import useLoginMutation from "../../hooks/login/useLoginMutation";

const LoginForm = memo(() => {
  const { handleLogin } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <MMyHeader custom={1} variants={slideAnimation} vsize={"xl"}>
        Login
      </MMyHeader>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((data) => handleLogin(data as LoginUserInput))}
      >
        <motion.label
          custom={2}
          variants={slideAnimation}
          htmlFor="email"
          className="font-medium"
        >
          Email
        </motion.label>

        <MMyInput
          custom={2}
          variants={slideAnimation}
          className="input input-bordered shadow"
          id="email"
          placeholder="example@gmail.com"
          {...register("email", {
            required: true,
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
          custom={3}
          variants={slideAnimation}
          htmlFor="password"
          className="font-medium"
        >
          Password
        </motion.label>
        <MMyInput
          custom={3}
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
        <Link to={"/forgot"}>
          <MMyParagraph
            custom={3}
            variants={slideAnimation}
            className="text-end link"
          >
            Forgot your password?
          </MMyParagraph>
        </Link>
        <MMyInput
          custom={4}
          variants={slideAnimation}
          className="btn btn-success bg-success shadow"
          type="submit"
          value={"Sign in"}
        />
      </form>

      <div className="flex flex-col items-center gap-1 mt-4">
        <MMyParagraph custom={5} variants={slideAnimation}>
          Don't have an account yet?
        </MMyParagraph>
        <Link to={`/registration`}>
          <MMyParagraph custom={7} variants={slideAnimation} className="link">
            Create a new one
          </MMyParagraph>
        </Link>
      </div>
    </>
  );
});

export default LoginForm;
