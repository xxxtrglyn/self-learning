import React, { memo, useRef, useState } from "react";

import { createStyles, FileInput, Group } from "@mantine/core";

const useStyles = createStyles(() => ({
  container: {
    height: "85vh",
  },
  player: {
    width: "50%",
  },
}));

const Player: React.FC = memo(() => {
  const { classes } = useStyles();

  const ref = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [file, setFile] = useState<File[] | undefined>([]);

  return (
    <>
      <Group>
        <FileInput
          value={file}
          onChange={setFile}
          multiple
          placeholder="Select songs here"
          style={{ width: "45%" }}
        />

        {file?.length && (
          <audio
            src={URL.createObjectURL(file[currentSong]!)}
            className={classes.player}
            autoPlay
            controls
            onEnded={() => {
              if (currentSong === file.length - 1) {
                setCurrentSong(0);
              } else {
                setCurrentSong((prev) => prev + 1);
              }
            }}
            ref={ref}
          />
        )}
      </Group>
    </>
  );
});

Player.displayName = "Player";

export default Player;
