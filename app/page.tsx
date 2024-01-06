import { NextPage } from "next";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link as NUILink,
} from "@nextui-org/react";
import Link from "next/link";

type HomePageProps = {};

const HomePage: NextPage = async ({}: HomePageProps) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <h1 className="text-lg font-bold text-center w-full">
          🔐 Credentials authentication demo
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="space-y-2 text-balance text-center font-medium tracking-wide">
        <p>
          This a demo for signing in using next-auth v5 credentials provider.
        </p>

        <p>
          There&apos;s a protected page{" "}
          <NUILink isExternal href="/users" as={Link}>
            (users)
          </NUILink>
          .
        </p>
        <p>
          If you&apos;re logged in, you&apos;ll see your email and a logout
          button, if not, you&apos;ll be redirected to the{" "}
          <NUILink isExternal href="/login" as={Link}>
            login page
          </NUILink>
          .
        </p>
        <div>
          <h1 className="font-bold text-lg">Features</h1>
          <ul className="list-disc">
            <li>Email Verification</li>
            <li>2-Factor Authentication</li>
            <li>Password Resetting</li>
          </ul>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex w-full justify-center">
          <NUILink
            isExternal
            showAnchorIcon
            href="https://github.com/NaderTate/credential-auth-demo"
          >
            Source code on GitHub.
          </NUILink>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HomePage;
