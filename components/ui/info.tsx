import { createStyles, Card, Avatar, Text, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
}

export default function UserCardImage({
  image,
  avatar,
  name,
  job,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

  return (
    <Card
      style={{ height: "100%" }}
      withBorder
      p="xl"
      radius="md"
      className={classes.card}
    >
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
      >
        Follow
      </Button>
    </Card>
  );
}
