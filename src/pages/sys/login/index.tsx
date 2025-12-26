import logo from "../../../assets/icons/logo.png";
import { GLOBAL_CONFIG } from "@/global-config";
import { useUserToken } from "@/store/userStore";
import { Navigate } from "react-router-dom";
import LoginForm from "./login-form";
import MobileForm from "./mobile-form";
import { LoginProvider } from "./providers/login-provider";
import QrCodeFrom from "./qrcode-form";
import RegisterForm from "./register-form";
import ResetForm from "./reset-form";

function LoginPage() {
  const token = useUserToken();

  if (token.accessToken) {
    return <Navigate to={GLOBAL_CONFIG.defaultRoute} replace />;
  }

  return (
    <div className="relative grid min-h-svh bg-[#F7FAFC]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium cursor-pointer">
            {/* <Logo size={28} /> */}
            <img src={logo} width={150} alt="logo" />
            {/* <span>{GLOBAL_CONFIG.appName}</span> */}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-[#FFF] px-10 py-15 rounded-lg">
            <div className="w-full max-w-xs">
              <LoginProvider>
                <LoginForm />
                <MobileForm />
                <QrCodeFrom />
                <RegisterForm />
                <ResetForm />
              </LoginProvider>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative hidden bg-[#EAEAEA] lg:flex items-center justify-center">
				<img src={PlaceholderImg} alt="placeholder img" className="absolute h-[400px] w-[400px] object-cover dark:brightness-[0.5] dark:grayscale" />
			</div> */}

      {/* <div className="absolute right-2 top-0 flex flex-row">
				<LocalePicker />
				<SettingButton />
			</div> */}
    </div>
  );
}
export default LoginPage;
