import { NextUIProvider } from "@nextui-org/react";

type Props = { children: React.ReactNode };

const CientProviders = ({ children }: Props) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default CientProviders;
