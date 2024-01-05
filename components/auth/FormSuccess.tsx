import { FaCircleCheck } from "react-icons/fa6";

type FormSuccessProps = { message: string | undefined };

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div className="bg-green-400/30 p-2 flex items-center w-full rounded-lg">
        <FaCircleCheck size={20} className="text-green-600" />
        <p className=" text-sm ml-1 text-green-700">{message}</p>
      </div>
    )
  );
};
