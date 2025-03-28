import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
  return (
    <>
      <div className=" bg-slate-600 min-h-screen ">
        <div className=" max-w-2xl mx-auto pt-10 px-5">
          <img src="../../public/Materiales DevTree/logo.svg" alt="logo"></img>
          <div className=" py-10">
            <Outlet />
          </div>
        </div>
      </div>

      <Toaster position="top-center"/>
    </>
  );
}
