import Logo from "@/components/logo";
import { down, useMediaQuery } from "@/hooks";
import { useSettings } from "@/store/settingStore";
import { ThemeLayout } from "#/enum";
import Header from "./header";
import Main from "./main";
import {
  NavHorizontalLayout,
  NavMobileLayout,
  NavVerticalLayout,
  useFilteredNavData,
} from "./nav";
import { useEffect, useState } from "react";
import { getFrontendNavData } from "./nav/nav-data/nav-data-frontend";

export default function DashboardLayout() {
  const isMobile = useMediaQuery(down("md"));

  return (
    <div
      data-slot="slash-layout-root"
      className="w-full min-h-screen bg-background"
    >
      {isMobile ? <MobileLayout /> : <PcLayout />}
    </div>
  );
}

function MobileLayout() {
  const navData = useFilteredNavData();
  return (
    <>
      {/* Sticky Header */}
      <Header leftSlot={<NavMobileLayout data={navData} />} />
      <Main />
    </>
  );
}

function PcLayout() {
  const { themeLayout } = useSettings();

  if (themeLayout === ThemeLayout.Horizontal) return <PcHorizontalLayout />;
  return <PcVerticalLayout />;
}

function PcHorizontalLayout() {
  const navData = useFilteredNavData();
  return (
    <>
      {/* Sticky Header */}
      <Header leftSlot={<Logo />} />
      {/* Sticky Nav */}
      <NavHorizontalLayout data={navData} />

      <Main />
    </>
  );
}

function PcVerticalLayout() {
  const [navData, setNavData] = useState(getFrontendNavData());

  useEffect(() => {
    const handleStorageChange = () => {
      setNavData(getFrontendNavData());
    };

    // localStorage va custom event'larni kuzatish
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("roleChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("roleChanged", handleStorageChange);
    };
  }, []);

  const settings = useSettings();
  const { themeLayout } = settings;

  const mainPaddingLeft =
    themeLayout === ThemeLayout.Vertical
      ? "var(--layout-nav-width)"
      : "var(--layout-nav-width-mini)";

  return (
    <>
      {/* navData o'zgaruvchisini ishlatamiz, useFilteredNavData emas */}
      <NavVerticalLayout data={navData} />

      <div
        className="relative w-full min-h-screen flex flex-col transition-[padding] duration-300 ease-in-out"
        style={{
          paddingLeft: mainPaddingLeft,
        }}
      >
        <Header />
        <Main />
      </div>
    </>
  );
}
