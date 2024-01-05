type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
