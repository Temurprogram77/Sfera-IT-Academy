import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav";
import { Badge } from "@/ui/badge";

// Role tiplarini aniqlash
export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "STUDENT"
  | "TEACHER"
  | "PARENT";

// LocalStorage dan role olish
function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem("role");
  return role as UserRole | null;
}

// Base navigation data - har bir role uchun alohida
const getNavDataByRole = (role: UserRole | null): NavProps["data"] => {
  if (!role) {
    // Agar role bo'lmasa, default basic menu
    return [
      {
        name: "Dashboard",
        items: [
          {
            title: "Bosh sahifa",
            path: "/",
            icon: <Icon icon="local:ic-workbench" size="24" />,
          },
        ],
      },
    ];
  }

  switch (role) {
    case "SUPER_ADMIN":
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "Super Admin Panel",
              path: "/dashboards/super_admin",
              icon: <Icon icon="local:ic-workbench" size="24" />, // mavjud
            },
            {
              title: "O'qituvchilar",
              path: "/dashboards/teacher",
              icon: <Icon icon="local:ic-workbench" size="24" />, // mavjud iconni qayta ishlatish
            },
            {
              title: "O'quvchilar",
              path: "/dashboards/student",
              icon: <Icon icon="local:ic-user" size="24" />, // mavjud
            },
            {
              title: "Ota-onalar",
              path: "/dashboards/parent",
              icon: <Icon icon="local:ic-workbench" size="24" />, // mavjud iconni qayta ishlatish
            },
            {
              title: "Tahlil",
              path: "/analysis",
              icon: <Icon icon="local:ic-user" size="24" />, // mavjud iconni qayta ishlatish
            },
          ],
        },
        {
          name: "Boshqaruv",
          items: [
            {
              title: "Foydalanuvchi",
              path: "/management",
              icon: <Icon icon="local:ic-management" size="24" />,
              children: [
                {
                  title: "Foydalanuvchi ma'lumotlari",
                  path: "/management/user",
                  children: [
                    {
                      title: "Profil",
                      path: "/management/user/profile",
                    },
                    {
                      title: "Hisob",
                      path: "/management/user/account",
                    },
                  ],
                },
                {
                  title: "Tizim sozlamalari",
                  path: "/management/system",
                  children: [
                    {
                      title: "Ruxsatlar",
                      path: "/management/system/permission",
                    },
                    {
                      title: "Rollar",
                      path: "/management/system/role",
                    },
                    {
                      title: "Foydalanuvchilar",
                      path: "/management/system/user",
                    },
                  ],
                },
              ],
            },
            {
              title: "Menyu darajalari",
              path: "/menu_level",
              icon: <Icon icon="local:ic-menulevel" size="24" />,
              children: [
                {
                  title: "Menyu 1a",
                  path: "/menu_level/1a",
                },
                {
                  title: "Menyu 1b",
                  path: "/menu_level/1b",
                  children: [
                    {
                      title: "Menyu 2a",
                      path: "/menu_level/1b/2a",
                    },
                    {
                      title: "Menyu 2b",
                      path: "/menu_level/1b/2b",
                      children: [
                        {
                          title: "Menyu 3a",
                          path: "/menu_level/1b/2b/3a",
                        },
                        {
                          title: "Menyu 3b",
                          path: "/menu_level/1b/2b/3b",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Xato sahifalari",
              path: "/error",
              icon: <Icon icon="bxs:error-alt" size="24" />,
              children: [
                {
                  title: "403 - Ruxsat yo'q",
                  path: "/error/403",
                },
                {
                  title: "404 - Topilmadi",
                  path: "/error/404",
                },
                {
                  title: "500 - Server xatosi",
                  path: "/error/500",
                },
              ],
            },
          ],
        },
        {
          name: "Komponentlar",
          items: [
            {
              title: "UI Komponentlar",
              path: "/components",
              icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
              caption: "Maxsus UI komponentlar",
              children: [
                {
                  title: "Ikonkalar",
                  path: "/components/icon",
                },
                {
                  title: "Animatsiyalar",
                  path: "/components/animate",
                },
                {
                  title: "Scroll",
                  path: "/components/scroll",
                },
                {
                  title: "Ko'p til",
                  path: "/components/multi-language",
                },
                {
                  title: "Yuklash",
                  path: "/components/upload",
                },
                {
                  title: "Grafiklar",
                  path: "/components/chart",
                },
                {
                  title: "Bildirishnomalar",
                  path: "/components/toast",
                },
              ],
            },
            {
              title: "Funksiyalar",
              path: "/functions",
              icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
              children: [
                {
                  title: "Clipboard",
                  path: "/functions/clipboard",
                },
                {
                  title: "Token muddati",
                  path: "/functions/token_expired",
                },
              ],
            },
          ],
        },
        {
          name: "Boshqa",
          items: [
            {
              title: "Ruxsat tekshiruvi",
              path: "/permission/page-test",
              icon: <Icon icon="mingcute:safe-lock-fill" size="24" />,
            },
            {
              title: "Kalendar",
              path: "/calendar",
              icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
              info: <Badge variant="warning">+12</Badge>,
            },
            {
              title: "O'chirilgan",
              path: "/disabled",
              icon: <Icon icon="local:ic-disabled" size="24" />,
              disabled: true,
            },
            {
              title: "Belgi",
              path: "#label",
              icon: <Icon icon="local:ic-label" size="24" />,
              info: (
                <Badge variant="info">
                  <Icon icon="solar:bell-bing-bold-duotone" size={14} />
                  Yangi
                </Badge>
              ),
            },
            {
              title: "Havola",
              path: "/link",
              icon: <Icon icon="local:ic-external" size="24" />,
              children: [
                {
                  title: "Tashqi havola",
                  path: "/link/external-link",
                },
                {
                  title: "Iframe",
                  path: "/link/iframe",
                },
              ],
            },
            {
              title: "Bo'sh sahifa",
              path: "/blank",
              icon: <Icon icon="local:ic-blank" size="24" />,
            },
          ],
        },
      ];

    case "ADMIN":
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "Admin Panel",
              path: "/dashboards/admin",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
            {
              title: "O'qituvchilar",
              path: "/dashboards/teacher",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
            {
              title: "O'quvchilar",
              path: "/dashboards/student",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
            {
              title: "Ota-onalar",
              path: "/dashboards/parent",
              icon: <Icon icon="local:ic-analysis" size="24" />,
            },
            {
              title: "Tahlil",
              path: "/analysis",
              icon: <Icon icon="local:ic-analysis" size="24" />,
            },
          ],
        },
        {
          name: "Boshqaruv",
          items: [
            {
              title: "Foydalanuvchi",
              path: "/management",
              icon: <Icon icon="local:ic-management" size="24" />,
              children: [
                {
                  title: "Foydalanuvchi ma'lumotlari",
                  path: "/management/user",
                  children: [
                    {
                      title: "Profil",
                      path: "/management/user/profile",
                    },
                    {
                      title: "Hisob",
                      path: "/management/user/account",
                    },
                  ],
                },
              ],
            },
            {
              title: "Menyu darajalari",
              path: "/menu_level",
              icon: <Icon icon="local:ic-menulevel" size="24" />,
              children: [
                {
                  title: "Menyu 1a",
                  path: "/menu_level/1a",
                },
                {
                  title: "Menyu 1b",
                  path: "/menu_level/1b",
                  children: [
                    {
                      title: "Menyu 2a",
                      path: "/menu_level/1b/2a",
                    },
                    {
                      title: "Menyu 2b",
                      path: "/menu_level/1b/2b",
                      children: [
                        {
                          title: "Menyu 3a",
                          path: "/menu_level/1b/2b/3a",
                        },
                        {
                          title: "Menyu 3b",
                          path: "/menu_level/1b/2b/3b",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Komponentlar",
          items: [
            {
              title: "UI Komponentlar",
              path: "/components",
              icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
              caption: "Maxsus UI komponentlar",
              children: [
                {
                  title: "Ikonkalar",
                  path: "/components/icon",
                },
                {
                  title: "Animatsiyalar",
                  path: "/components/animate",
                },
                {
                  title: "Scroll",
                  path: "/components/scroll",
                },
                {
                  title: "Ko'p til",
                  path: "/components/multi-language",
                },
                {
                  title: "Yuklash",
                  path: "/components/upload",
                },
                {
                  title: "Grafiklar",
                  path: "/components/chart",
                },
                {
                  title: "Bildirishnomalar",
                  path: "/components/toast",
                },
              ],
            },
            {
              title: "Funksiyalar",
              path: "/functions",
              icon: <Icon icon="solar:plain-2-bold-duotone" size="24" />,
              children: [
                {
                  title: "Clipboard",
                  path: "/functions/clipboard",
                },
                {
                  title: "Token muddati",
                  path: "/functions/token_expired",
                },
              ],
            },
          ],
        },
        {
          name: "Boshqa",
          items: [
            {
              title: "Kalendar",
              path: "/calendar",
              icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
              info: <Badge variant="warning">+12</Badge>,
            },
            {
              title: "Havola",
              path: "/link",
              icon: <Icon icon="local:ic-external" size="24" />,
              children: [
                {
                  title: "Tashqi havola",
                  path: "/link/external-link",
                },
                {
                  title: "Iframe",
                  path: "/link/iframe",
                },
              ],
            },
            {
              title: "Bo'sh sahifa",
              path: "/blank",
              icon: <Icon icon="local:ic-blank" size="24" />,
            },
          ],
        },
      ];

    case "TEACHER":
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "O'qituvchi paneli",
              path: "/dashboards/teacher",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
            {
              title: "O'quvchilar",
              path: "/dashboards/student",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
          ],
        },
        {
          name: "Boshqaruv",
          items: [
            {
              title: "Foydalanuvchi",
              path: "/management",
              icon: <Icon icon="local:ic-management" size="24" />,
              children: [
                {
                  title: "Profil",
                  path: "/management/user/profile",
                },
                {
                  title: "Hisob",
                  path: "/management/user/account",
                },
              ],
            },
          ],
        },
        {
          name: "Komponentlar",
          items: [
            {
              title: "UI Komponentlar",
              path: "/components",
              icon: <Icon icon="solar:widget-5-bold-duotone" size="24" />,
              caption: "Maxsus UI komponentlar",
              children: [
                {
                  title: "Ikonkalar",
                  path: "/components/icon",
                },
                {
                  title: "Animatsiyalar",
                  path: "/components/animate",
                },
                {
                  title: "Scroll",
                  path: "/components/scroll",
                },
                {
                  title: "Ko'p til",
                  path: "/components/multi-language",
                },
                {
                  title: "Yuklash",
                  path: "/components/upload",
                },
                {
                  title: "Grafiklar",
                  path: "/components/chart",
                },
                {
                  title: "Bildirishnomalar",
                  path: "/components/toast",
                },
              ],
            },
          ],
        },
        {
          name: "Boshqa",
          items: [
            {
              title: "Kalendar",
              path: "/calendar",
              icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
              info: <Badge variant="warning">+12</Badge>,
            },
            {
              title: "Bo'sh sahifa",
              path: "/blank",
              icon: <Icon icon="local:ic-blank" size="24" />,
            },
          ],
        },
      ];

    case "STUDENT":
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "O'quvchi paneli",
              path: "/dashboards/student",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
          ],
        },
        {
          name: "Boshqaruv",
          items: [
            {
              title: "Foydalanuvchi",
              path: "/management",
              icon: <Icon icon="local:ic-management" size="24" />,
              children: [
                {
                  title: "Profil",
                  path: "/management/user/profile",
                },
                {
                  title: "Hisob",
                  path: "/management/user/account",
                },
              ],
            },
          ],
        },
        {
          name: "Boshqa",
          items: [
            {
              title: "Kalendar",
              path: "/calendar",
              icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
              info: <Badge variant="warning">+12</Badge>,
            },
            {
              title: "Bo'sh sahifa",
              path: "/blank",
              icon: <Icon icon="local:ic-blank" size="24" />,
            },
          ],
        },
      ];

    case "PARENT":
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "Ota-ona paneli",
              path: "/dashboards/parent",
              icon: <Icon icon="local:ic-analysis" size="24" />,
            },
          ],
        },
        {
          name: "Boshqaruv",
          items: [
            {
              title: "Foydalanuvchi",
              path: "/management",
              icon: <Icon icon="local:ic-management" size="24" />,
              children: [
                {
                  title: "Profil",
                  path: "/management/user/profile",
                },
                {
                  title: "Hisob",
                  path: "/management/user/account",
                },
              ],
            },
          ],
        },
        {
          name: "Boshqa",
          items: [
            {
              title: "Kalendar",
              path: "/calendar",
              icon: <Icon icon="solar:calendar-bold-duotone" size="24" />,
              info: <Badge variant="warning">+12</Badge>,
            },
            {
              title: "Bo'sh sahifa",
              path: "/blank",
              icon: <Icon icon="local:ic-blank" size="24" />,
            },
          ],
        },
      ];

    default:
      return [
        {
          name: "Dashboard",
          items: [
            {
              title: "Bosh sahifa",
              path: "/",
              icon: <Icon icon="local:ic-workbench" size="24" />,
            },
          ],
        },
      ];
  }
};

// MUHIM: Bu getter function - har safar chaqirilganda yangi data qaytaradi
export function getFrontendNavData(): NavProps["data"] {
  const role = getUserRole();
  return getNavDataByRole(role);
}

// Backward compatibility - lekin bu funksiyani ishlatish YAXSHIROQ
export const frontendNavData = getFrontendNavData();

// Storage event listener - role o'zgarganda avtomatik yangilash
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "role") {
      // Role o'zgarganda page ni reload qilish
      window.location.reload();
    }
  });
}
