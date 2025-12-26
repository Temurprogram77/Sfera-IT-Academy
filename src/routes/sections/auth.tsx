import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/sys/login"));
const authCustom: RouteObject[] = [
	{
		path: "login",
		element: <LoginPage />,
	},
];

export const authRoutes: RouteObject[] = [
	{
		path: "auth",
		element: (
			<Suspense>
				<Outlet />
			</Suspense>
		),
		children: [...authCustom],
	},
];
