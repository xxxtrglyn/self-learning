import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { Text, UnstyledButton, createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import { deleteDocument } from "../../store/document-actions";
import { Color } from "../../lib/color";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: "20vh",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

interface DeleteDocument {
  delete(): void;
}

const DocsList = forwardRef<DeleteDocument, { deleteMode: boolean }>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      delete() {
        deleteHandler();
      },
    }));
    const router = useRouter();
    const { classes } = useStyles();
    const docs = useSelector((state: RootState) => state.document.items);
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const checkIsSelected = (id: string) => {
      if (selectedId.find((id1) => id1 === id) && props.deleteMode) {
        return true;
      } else {
        return false;
      }
    };
    useEffect(() => {
      setSelectedId([]);
    }, [props.deleteMode]);

    const deleteHandler = () => {
      dispatch(deleteDocument(selectedId));
      setSelectedId([]);
    };
    const list = docs.map((doc, index) => (
      <UnstyledButton
        style={
          checkIsSelected(doc.id)
            ? {
                backgroundColor: "rgba(255,0,0,0.1)",
                border: `1px solid ${Color[index]}`,
              }
            : { border: `1px solid ${Color[index]}` }
        }
        key={doc.id}
        className={classes.item}
        onClick={
          props.deleteMode
            ? () => {
                if (selectedId.find((id) => id === doc.id)) {
                  setSelectedId((prev) => prev.filter((id) => id !== doc.id));
                } else {
                  setSelectedId((prev) => prev.concat(doc.id));
                }
              }
            : () => {
                router.push(`/documents/${doc.id}`);
              }
        }
      >
        <Text mt={7}>{doc.subjectName}</Text>
      </UnstyledButton>
    ));

    return <>{list}</>;
  }
);

DocsList.displayName = "khieulam";
export default DocsList;
