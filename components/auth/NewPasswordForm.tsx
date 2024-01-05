"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { newPassword } from "@/actions/new-password";
import { useRouter, useSearchParams } from "next/navigation";

type NewPasswordFormProps = {};

export const NewPasswordForm = ({}: NewPasswordFormProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data.success) {
          setSuccess(data?.success);
          router.push("/login");
        }
        setError(data?.error);
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
            {...register("password")}
            id="password"
            type="password"
            label="new password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
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
      </CardBody>
    </Card>
  );
};
