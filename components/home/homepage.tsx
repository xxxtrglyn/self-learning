import {
  Group,
  Text,
  createStyles,
  Card,
  Stack,
  Button,
  SimpleGrid,
  Center,
  TextInput,
  Textarea,
  List,
} from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo3.png";
import { StudyImage } from "../ui/studyimage";
import Login from "../auth/authform";
import {
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconNote,
  IconHourglass,
  IconMapPin,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandGithub,
  IconPhone,
  IconMail,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    padding: "20px 50px",
  },
  text: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    color: "#656161",
    ":hover": {
      color: "blue",
    },
  },
  headerButton: {
    padding: "0 10px",
    cursor: "pointer",
  },
  logo: {
    objectFit: "cover",
    display: "inline",
  },
  main: {},
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 55,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,
  },
  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,
  },
  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 100,
      height: 2,
      margin: "0 auto",
      marginTop: theme.spacing.sm,
    },
  },
  section: {
    paddingBottom: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
}));

const features = [
  {
    title: "Goal",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconGauge,
  },
  {
    title: "Study Room",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconDeviceDesktopAnalytics,
  },
  {
    title: "Timetable",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconCalendarStats,
  },
  {
    title: "Goal Management",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconUser,
  },
  {
    title: "Note",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconNote,
  },
  {
    title: "Clock",
    des: "sas asa saskajs salskals skaslksalsas",
    icon: IconHourglass,
  },
];

const HomePage = () => {
  const { classes, theme } = useStyles();
  const [isShowLoginForm, setIsShowLoginForm] = useState<boolean>(false);
  const showLoginFormHandler = () => {
    setIsShowLoginForm(true);
  };
  const hideLoginFormHandler = () => {
    setIsShowLoginForm(false);
  };
  const featureCard = features.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      p="xl"
      className={classes.card}
    >
      <Stack align="center">
        <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
        <Text
          align="center"
          size="lg"
          weight={500}
          className={classes.cardTitle}
          mt="md"
        >
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.des}
        </Text>
      </Stack>
    </Card>
  ));
  return (
    <>
      <header className={classes.header}>
        <Group position="apart">
          <Card radius="xl" shadow="sm" p={0} m={0}>
            <Image height={50} className={classes.logo} src={logo} alt="logo" />
          </Card>
          <Group>
            <a href="#home" className={classes.headerButton}>
              <Text className={classes.text}>Home</Text>
            </a>
            <a href="#features" className={classes.headerButton}>
              <Text className={classes.text}>Features</Text>
            </a>
            <a href="#contact" className={classes.headerButton}>
              <Text className={classes.text}>Contact</Text>
            </a>
            <a href="#about" className={classes.headerButton}>
              <Text className={classes.text}>About</Text>
            </a>
          </Group>
        </Group>
      </header>
      <main className={classes.main}>
        <section className={classes.section} id="home">
          <Group position="apart" px={50}>
            <Stack>
              <h1 className={classes.title}>
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan" }}
                  inherit
                >
                  Self-Learning
                </Text>{" "}
              </h1>
              <Text className={classes.description} color="dimmed">
                If I don&apos;t have to do it,{" "}
                <Text
                  style={{ display: "inline-block" }}
                  color="grape"
                  weight={500}
                >
                  I won&apos;t.
                </Text>
              </Text>
              <Text className={classes.description} color="dimmed">
                If I have to do it, then{" "}
                <Text
                  style={{ display: "inline-block" }}
                  color="grape"
                  weight={500}
                >
                  make it quick.
                </Text>
              </Text>
              <Group position="center" my={40}>
                <Button
                  onClick={showLoginFormHandler}
                  variant="outline"
                  className={classes.control}
                  size="xl"
                >
                  Get Started
                </Button>
              </Group>
            </Stack>
            <StudyImage width={500} height={500} />
          </Group>
        </section>
        <section className={classes.section} id="features">
          <Center pb={50}>
            <Text size={24} className={classes.cardTitle}>
              What{" "}
              <Text color="blue" style={{ display: "inline" }} size={40}>
                Self Learning
              </Text>{" "}
              provide{" "}
            </Text>
          </Center>
          <SimpleGrid cols={3}>{featureCard}</SimpleGrid>
        </section>
        <section className={classes.section} id="contact">
          <Card
            radius="md"
            shadow="xl"
            px={40}
            style={{ width: "70%", margin: "0 auto" }}
          >
            <Stack>
              <Text align="center" size={30} className={classes.cardTitle}>
                CONTACT
              </Text>
              <SimpleGrid cols={2}>
                <form>
                  <Stack>
                    <Text weight="bold">Leave us a message</Text>
                    <TextInput placeholder="Your name" />
                    <TextInput placeholder="Email Address" />
                    <Textarea
                      placeholder="Your Message"
                      minRows={5}
                      maxRows={5}
                    />
                  </Stack>
                </form>
                <Stack>
                  <List listStyleType="none" px={10} py={35}>
                    <List.Item icon={<IconMapPin color="green" />} p={10}>
                      <Text weight={500}>
                        Luyn, 98 Nguyen Luong Bang, Lien Chieu Da Nang
                      </Text>
                    </List.Item>
                    <List.Item p={10} icon={<IconPhone color="blue" />}>
                      <Text weight={500}>+84379931731</Text>
                    </List.Item>
                    <List.Item p={10} icon={<IconMail color="yellow" />}>
                      <Text weight={500}>xxxtrglyn@gmail.com</Text>
                    </List.Item>
                    <List.Item p={10}>
                      <Group>
                        <IconBrandFacebook color="blue" />
                        <IconBrandGithub />
                        <IconBrandInstagram color="orange" />
                        <IconBrandYoutube color="red" />
                        <IconBrandTwitter color="lightblue" />
                      </Group>
                    </List.Item>
                  </List>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Card>
        </section>
        <section
          id="about"
          style={{ backgroundColor: "#5669FF", height: "300px", padding: 50 }}
        >
          <Group position="apart" px={50} py={20}>
            <Stack>
              <Group position="center">
                <Card radius="xl" shadow="sm" p={0} m={0}>
                  <Image
                    height={50}
                    className={classes.logo}
                    src={logo}
                    alt="logo"
                  />
                </Card>
              </Group>
              <Text color="white">
                &quot;The more inexperienced one is,{" "}
                <Text color="white">
                  the more he displays the unconventional.&quot;
                </Text>
              </Text>
            </Stack>
            <Group px={70}>
              <Stack>
                <Text weight="bold" color="white">
                  Framework
                </Text>
                <Text color="white">NextJS</Text>
                <Text color="white">Framework</Text>
              </Stack>
              <Stack>
                <Text weight="bold" color="white">
                  Database
                </Text>
                <Text color="white">PostgreSQL</Text>
                <Text color="white">Prism</Text>
              </Stack>
              <Stack>
                <Text weight="bold" color="white">
                  UI
                </Text>
                <Text color="white">Mantine</Text>
                <Text color="white">Framework</Text>
              </Stack>
            </Group>
          </Group>
        </section>
      </main>
      <Login isOpened={isShowLoginForm} onClose={hideLoginFormHandler} />
    </>
  );
};

export default HomePage;
