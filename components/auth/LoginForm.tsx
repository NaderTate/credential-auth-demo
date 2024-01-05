"use client";
import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link as NUILink,
  Input,
  Button,
} from "@nextui-org/react";

import { ErrorMessage } from "@hookform/error-message";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
type Props = {};

export const LoginForm = ({}: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [isPending, startTransition] = useTransition();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            // reset();
            setError(data.error);
          }
          if (data?.success) {
            reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-xl font-bold">Login</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col items-center"
        >
          {showTwoFactor ? (
            <>
              <Input
                variant="bordered"
                label="Two factor code"
                type="number"
                {...register("code")}
              />
              <ErrorMessage
                errors={errors}
                name="code"
                render={({ message }) => (
                  <p className="text-red-500 text-sm text-left w-full">
                    {message}
                  </p>
                )}
              />
            </>
          ) : (
            <>
              <Input
                variant="bordered"
                label="Email"
                type="email"
                {...register("email")}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-500 text-sm text-left w-full">
                    {message}
                  </p>
                )}
              />
              <Input
                variant="bordered"
                label="Password"
                type="password"
                {...register("password")}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-sm text-left w-full">
                    {message}
                  </p>
                )}
              />
              <NUILink
                as={Link}
                color="primary"
                href="/reset-password"
                className="w-full text-left text-sm"
              >
                Forgot password?
              </NUILink>
            </>
          )}
          <FormError error={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            isLoading={isPending}
            isDisabled={isPending}
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <NUILink as={Link} href="/signup" color="primary">
            Don&apos;t have an account?
          </NUILink>
        </form>
      </CardBody>
    </Card>
  );
};
