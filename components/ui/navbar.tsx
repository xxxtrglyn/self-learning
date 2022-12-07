import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconBooks,
  IconLogout,
  IconSwitchHorizontal,
  IconNote,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/auth-actions";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Goals" },
  { icon: IconDeviceDesktopAnalytics, label: "Study Room" },
  { icon: IconCalendarStats, label: "Timetable" },
  { icon: IconUser, label: "Profile" },
  { icon: IconNote, label: "Note" },
  { icon: IconBooks, label: "Document" },
];

const NavbarMinimal: React.FC<{ order: number }> = ({ order }) => {
  const [active, setActive] = useState(order);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        if (link.label === "Home") {
          router.replace("/");
        }
        if (link.label === "Analytics") {
          router.replace("/analytics");
        }
        if (link.label === "Goals") {
          router.replace("/goals");
        }
        if (link.label === "Note") {
          router.replace("/notes");
        }
        if (link.label === "Timetable") {
          router.replace("/timetables");
        }
        if (link.label === "Profile") {
          router.replace("/profile");
        }
        if (link.label === "Study Room") {
          router.replace("/studyroom");
        }
        if (link.label === "Document") {
          router.replace("/documents");
        }
      }}
    />
  ));

  return (
    <Navbar height={"100vh"} width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            onClick={() => {
              dispatch(logout());
            }}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarMinimal;
