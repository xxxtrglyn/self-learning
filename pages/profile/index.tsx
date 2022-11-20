import {
  Avatar,
  Center,
  createStyles,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { DatePicker } from "@mantine/dates";
import MainLayout from "../../components/ui/mainlayout";
import { getToken } from "next-auth/jwt";
import prisma from "../../lib/prisma";
import { User } from "../../types/user";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { RootState, useAppDispatch } from "../../store";
import { updateProfile } from "../../store/auth-actions";
import ChangePassword from "../../components/auth/changepassword";
import { useSelector } from "react-redux";

const useStyles = createStyles((theme) => ({
  wrapper: {
    flex: 1,
    height: "100vh",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    marginLeft: 200,
    marginRight: 200,
    paddingLeft: theme.spacing.xl * 5,
    paddingRight: theme.spacing.xl * 5,
    paddingTop: theme.spacing.xl * 1.2,
    paddingBottom: theme.spacing.xl * 1.2,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },
}));

const Profile: NextPage<{ userInfo: User }> = ({ userInfo }) => {
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.ui.loaderOverlay);

  const form = useForm({
    initialValues: {
      email: userInfo.email,
      fullname: userInfo.fullname!,
      avatar: userInfo.avatar,
      dob: userInfo.dob ? userInfo.dob : null,
      phone: userInfo.phone ? userInfo.phone : "",
      quotes: userInfo.quotes ? userInfo.quotes : "",
      city: userInfo.city ? userInfo.city : "",
    },

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      fullname: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <>
      <MainLayout order={4}>
        <div className={classes.wrapper}>
          <SimpleGrid>
            <Center>
              <Avatar
                size={150}
                radius={100}
                src={form.values.avatar}
                alt="avatar of a user"
              />
            </Center>
            <form>
              <Stack>
                <TextInput
                  label="Email"
                  value={form.values.email}
                  labelProps={{ style: { color: "white" } }}
                  disabled
                />
                <SimpleGrid cols={2}>
                  <TextInput
                    label="Fullname"
                    value={form.values.fullname}
                    onChange={(e) => {
                      form.setFieldValue("fullname", e.currentTarget.value);
                    }}
                    labelProps={{ style: { color: "white" } }}
                  />
                  <TextInput
                    label="Phone"
                    type="number"
                    value={form.values.phone}
                    onChange={(e) => {
                      form.setFieldValue("phone", +e.currentTarget.value);
                    }}
                    labelProps={{ style: { color: "white" } }}
                  />
                </SimpleGrid>
                <SimpleGrid cols={2}>
                  <DatePicker
                    label="Birthday"
                    labelProps={{ style: { color: "white" } }}
                    value={new Date(form.values.dob!)}
                    onChange={(e) => {
                      form.setFieldValue("dob", e?.toISOString()!);
                    }}
                  />
                  <TextInput
                    label="City"
                    value={form.values.city}
                    onChange={(e) => {
                      form.setFieldValue("city", e.currentTarget.value);
                    }}
                    labelProps={{ style: { color: "white" } }}
                  />
                </SimpleGrid>
                <Textarea
                  label="Quote"
                  value={form.values.quotes}
                  onChange={(e) => {
                    form.setFieldValue("quotes", e.currentTarget.value);
                  }}
                  labelProps={{ style: { color: "white" } }}
                  minRows={4}
                />
                <Group position="center">
                  <Button
                    variant="white"
                    loading={isLoading}
                    onClick={() => {
                      dispatch(
                        updateProfile({
                          fullname: form.values.fullname,
                          phone: +form.values.phone,
                          dob: form.values.dob,
                          city: form.values.city,
                          quotes: form.values.quotes,
                          job: "IT",
                        })
                      );
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="white"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Change Password
                  </Button>
                </Group>
              </Stack>
            </form>
          </SimpleGrid>
        </div>
      </MainLayout>
      <ChangePassword
        opened={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.sub,
    },
  });

  const transformUser: User = {
    id: user?.id!,
    email: user?.email!,
    fullname: user?.fullname!,
    emailVerified: user?.emailVerified
      ? user?.emailVerified.toISOString()
      : null,
    avatar: user?.avatar ? user?.avatar : null,
    dob: user?.dob ? user?.dob?.toISOString() : null,
    phone: user?.phone!,
    quotes: user?.quotes!,
    city: user?.city!,
    job: user?.job!,
    createdAt: user?.createdAt!.toISOString(),
    updatedAt: user?.updatedAt!.toISOString(),
  };
  return {
    props: {
      userInfo: transformUser,
    },
  };
};

export default Profile;
