import { createStyles, Card, Avatar, Text, Button } from "@mantine/core";
import { TransformDate } from "../../lib/transformdate";

const useStyles = createStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    minHeight: "70vh",
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
  avatar: string | null;
  name: string | null;
  job?: string | undefined | null;
  quotes?: string | undefined | null;
  city?: string | undefined | null;
  dob?: string | undefined | null;
}

const UserCardImage: React.FC<{ user: UserCardImageProps }> = ({ user }) => {
  const { classes, theme } = useStyles();

  return (
    <Card
      style={{ height: "100%" }}
      withBorder
      p="xl"
      radius="md"
      className={classes.card}
    >
      <Card.Section
        sx={{ backgroundImage: `url(${user.image})`, height: 140 }}
      />
      <Avatar
        src={user.avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text align="center" size="lg" weight={500} mt="sm">
        {user.name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {user.job}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {user.dob
          ? TransformDate(user.dob) +
            ", " +
            new Date(user.dob!).getFullYear().toString()
          : null}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {user.city ? user.city : null}
      </Text>
      {user.quotes && (
        <Text
          align="center"
          size="sm"
          color="dimmed"
          italic
          style={{ marginTop: "auto" }}
        >
          &quot;{user.quotes}&quot;
        </Text>
      )}
    </Card>
  );
};

export default UserCardImage;
