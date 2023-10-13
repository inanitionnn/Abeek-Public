import { motion } from "framer-motion";
import MMyHeader from "../../atom/myHeader";
import MMyInput from "../../atom/myInput";
import { useForm } from "react-hook-form";
import { slideAnimation } from "../../constants";
import useForgetPassword from "../../hooks/reset/useForgetPassword";

export default function Forgot() {
  const { handleForgot } = useForgetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="md:ml-[70px] lg:ml-[190px] relative"
      >
        <img
          src="/posters10.webp"
          alt="poster"
          className="absolute w-full h-screen object-cover -z-50"
        />
        <div className="bg-base-100 bg-opacity-[0.70] flex justify-center">
          <div className="min-h-screen  sm:max-w-[860px] flex items-center sm:px-[40px] ">
            <div className=" backdrop-contrast-75 bg-opacity-75 backdrop-blur-md bg-base-100  px-12 sm:px-[8rem] py-[4rem] rounded-3xl">
              <MMyHeader custom={0} variants={slideAnimation} vsize={"xl"}>
                Reset password
              </MMyHeader>
              <form
                className="flex flex-col gap-2 mt-12"
                onSubmit={handleSubmit((data) => handleForgot(data.email))}
              >
                <motion.label
                  custom={1}
                  variants={slideAnimation}
                  htmlFor="email"
                  className="font-medium"
                >
                  Email
                </motion.label>

                <MMyInput
                  custom={1}
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
                {errors.email && errors.email.message ? (
                  <div className="badge badge-error">
                    {errors.email.message?.toString()}
                  </div>
                ) : null}
                <MMyInput
                  custom={2}
                  variants={slideAnimation}
                  className="btn btn-primary bg-primary shadow mt-6"
                  type="submit"
                  value={"Continue"}
                />
              </form>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}
