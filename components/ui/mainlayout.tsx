import React, { useEffect } from "react";
import NavbarMinimal from "./navbar";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { showNotification } from "@mantine/notifications";
import { uiActions } from "../../store/ui-slice";
type Props = {
  children?: React.ReactNode;
  order: number;
};

const MainLayout: React.FC<Props> = (props) => {
  const notifications = useSelector(
    (state: RootState) => state.ui.notification
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (notifications) {
      showNotification({
        title: notifications.title,
        message: notifications.message,
        color: notifications.status === "error" ? "red" : "teal",
      });
      dispatch(uiActions.showNotification(null));
    }
  }, [notifications, dispatch]);
  return (
    <Container>
      <NavbarMinimal order={props.order} />
      {props.children}
    </Container>
  );
};

export default MainLayout;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f8f9fa;
`;
