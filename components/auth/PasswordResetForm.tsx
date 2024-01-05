"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

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
import { resetPassword } from "@/actions/reset-password";
import Link from "next/link";

type PasswordResetFormProps = {};

export const PasswordResetForm = ({}: PasswordResetFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="flex justify-center">
        <h1 className="text-xl font-bold">Password reset</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            variant="bordered"
            {...register("email")}
            id="email"
            type="email"
            label="Email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className="text-red-500 text-sm text-left w-full">{message}</p>
            )}
          />
          <Button
            color="primary"
            fullWidth
            type="submit"
            isDisabled={isPending}
            isLoading={isPending}
          >
            Reset Password
          </Button>
          <FormSuccess message={success} />
          <FormError error={error} />
        </form>
        <NUILink as={Link} href="/login">
          Back to login
        </NUILink>
      </CardBody>
    </Card>
  );
};
