"use client";

import { Card, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyEmail } from "@/actions/verify-email";

import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

type VerificationFormProps = {};

export const VerificationForm = ({}: VerificationFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
          router.push("/login");
        }
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-96">
      {!success && !error && (
        <>
          <h1 className="text-lg font-bold text-center">Verifying</h1>
          <Spinner />
        </>
      )}
      {success && (
        <div className="bg-green-400/30 p-2 flex items-center w-full rounded-lg">
          <FaCircleCheck size={20} className="text-green-600" />
          <p className=" text-sm ml-1 text-green-700">{success}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-400/30 p-2 flex items-center w-full rounded-lg">
          <FaCircleExclamation size={20} className="text-red-600" />
          <p className=" text-sm ml-1 text-red-700">{error}</p>
        </div>
      )}
    </Card>
  );
};
