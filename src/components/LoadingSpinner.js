import { CgSpinner } from "react-icons/cg";

export const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex justify-center items-center w-8 h-8">
        <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    </div>
  );
};
