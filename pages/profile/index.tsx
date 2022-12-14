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
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  wrapper: {
    flex: 1,
    height: "100vh",
    boxSizing: "border-box",
    backgroundColor: "rgba(0,0,0, 0.3)",
    border: "1px solid black",
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
  const [files, setFiles] = useState<FileWithPath>();

  const form = useForm({
    initialValues: {
      email: userInfo.email,
      fullname: userInfo.fullname!,
      avatar: userInfo.avatar ? userInfo.avatar : "",
      dob: userInfo.dob ? userInfo.dob : null,
      phone: userInfo.phone ? userInfo.phone : "",
      quotes: userInfo.quotes ? userInfo.quotes : "",
      city: userInfo.city ? userInfo.city : "",
    },
    validateInputOnChange: true,

    validate: {
      // email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      fullname: (val) =>
        val.length < 6 ? "Fullname should include at least 6 characters" : null,
    },
  });

  return (
    <>
      <MainLayout order={4}>
        <div className={classes.wrapper}>
          <SimpleGrid>
            <Center>
              <Dropzone
                p={0}
                m={0}
                radius={100}
                onDrop={(files) => {
                  setFiles(files[0]);
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <Avatar
                  size={150}
                  radius={100}
                  src={files ? URL.createObjectURL(files) : form.values.avatar}
                  alt="avatar of a user"
                />
              </Dropzone>
            </Center>
            <form
              onSubmit={form.onSubmit((values) => {
                if (files) {
                  const avatarFile = new FormData();
                  avatarFile.append("file", files!);
                  avatarFile.append("upload_preset", "user_avatar");
                  avatarFile.append("cloud_name", "dvmih2q1y");
                  axios
                    .post(
                      "https://api.cloudinary.com/v1_1/dvmih2q1y/upload",
                      avatarFile
                    )
                    .then((res) => {
                      dispatch(
                        updateProfile({
                          avatar: res.data.url,
                          fullname: values.fullname,
                          phone: +values.phone,
                          dob: values.dob,
                          city: values.city,
                          quotes: values.quotes,
                          job: "IT",
                        })
                      );
                    });
                } else {
                  dispatch(
                    updateProfile({
                      avatar: values.avatar,
                      fullname: values.fullname,
                      phone: +values.phone,
                      dob: values.dob,
                      city: values.city,
                      quotes: values.quotes,
                      job: "IT",
                    })
                  );
                }
              })}
            >
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
                    error={form.errors.fullname}
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
                  <Button variant="white" type="submit" loading={isLoading}>
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
    role: user?.role!,
  };
  return {
    props: {
      userInfo: transformUser,
    },
  };
};

export default Profile;
