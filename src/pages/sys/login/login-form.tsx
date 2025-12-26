import { DB_USER } from "@/_mock/assets_backup";
import type { SignInReq } from "@/api/services/userService";
import { GLOBAL_CONFIG } from "@/global-config";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LoginStateEnum,
  useLoginStateContext,
} from "./providers/login-provider";
import { jwt } from "@/_mock/assets_backup";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const roleRouteMap: Record<string, string> = {
    ADMIN: "/dashboards/admin",
    SUPER_ADMIN: "/dashboards/super_admin",
    TEACHER: "/dashboards/teacher",
    PARENT: "/dashboards/parent",
    USER: "/dashboards/student",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role && roleRouteMap[role]) {
      navigate(roleRouteMap[role], { replace: true });
    }
  }, [navigate]);

  const { loginState, setLoginState: _ } = useLoginStateContext();
  const form = useForm<SignInReq>({
    defaultValues: {
      phoneNumber: DB_USER[0].phone,
      password: DB_USER[0].password,
    },
  });

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async (values: SignInReq) => {
    setLoading(true);
    try {
      const user = DB_USER.find(
        (u) => u.phone === values.phoneNumber && u.password === values.password
      );

      if (!user) {
        toast.error("Telefon raqami yoki parol noto‘g‘ri!");
        return;
      }

      console.log("User:", user);

      localStorage.setItem("token", jwt);
      localStorage.setItem("role", user.role as string);

      // Routing
      switch (user.role) {
        case "ADMIN":
          navigate("/dashboards/admin", { replace: true });
          break;
        case "SUPER_ADMIN":
          navigate("/dashboards/super_admin", { replace: true });
          break;
        case "TEACHER":
          navigate("/dashboards/teacher", { replace: true });
          break;
        case "PARENT":
          navigate("/dashboards/parent", { replace: true });
          break;
        case "USER":
          navigate("/dashboards/student", { replace: true });
          break;
        default:
          navigate(GLOBAL_CONFIG.defaultRoute, { replace: true });
      }

      toast.success(t("sys.login.loginSuccessTitle"), {
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Form {...form} {...props}>
        <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {t("sys.login.signInFormTitle")}
            </h1>
            <p className="text-balance text-sm text-muted-foreground">
              {t("sys.login.signInFormDescription")}
            </p>
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{ required: "Telefon raqam majburiy" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon raqami</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+998 90 000 00 00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{ required: t("sys.login.passwordPlaceholder") }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sys.login.password")}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {loading && <Loader2 className="animate-spin mr-2" />}
            {t("sys.login.loginButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
