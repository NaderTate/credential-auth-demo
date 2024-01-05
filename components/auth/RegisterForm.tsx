"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link as NUILink,
  Input,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import {} from "react";
import { signup } from "@/actions/signup";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";

type SignUpProps = {};

export const SignUpForm = ({}: SignUpProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-xl font-bold">Sign up</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <form
          className="space-y-3 flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            variant="bordered"
            label="Name"
            type="text"
            {...register("name")}
          />

          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <p className="text-red-500 text-sm text-left w-full">{message}</p>
            )}
          />
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
              <p className="text-red-500 text-sm text-left w-full">{message}</p>
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
              <p className="text-red-500 text-sm text-left w-full">{message}</p>
            )}
          />
          <FormError error={error} />
          <FormSuccess message={success} />
          <Button
            color="primary"
            fullWidth
            type="submit"
            isDisabled={isPending}
            isLoading={isPending}
          >
            Sign up
          </Button>
          <NUILink as={Link} color="primary" href="/login" className="text-sm">
            Already have an account? Login
          </NUILink>
        </form>
      </CardBody>
    </Card>
  );
};
