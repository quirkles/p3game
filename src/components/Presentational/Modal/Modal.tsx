import { PropsWithChildren } from "react";
import styled from "styled-components";
import {
  FlexChild,
  FlexContainer,
} from "@/components/Presentational/Layout/FlexContainer";
import { Heading } from "@/components/Presentational/Heading";
import { getColor, getFontColor } from "@/styles/colors";

const StyledModal = styled.div<{
  $isShowing: boolean;
}>`
  z-index: ${({ $isShowing }) => ($isShowing ? 200 : -1)};
  opacity: ${({ $isShowing }) => ($isShowing ? 1 : 0)};
  transition: all 0.3s ease;
  .modal-content {
    z-index: 201;
    position: fixed;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background-color: ${getColor("white")};
    .modal-title,
    .modal-body {
      padding: 1rem;
    }
    .modal-title {
      background-color: ${getColor("blue")};
      color: ${getFontColor("blue")};
    }
  }
  .modal-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

interface ModalProps {
  title?: string;
  isShowing: boolean;
  handleClose: () => void;
}

export function Modal({
  isShowing,
  title,
  handleClose,
  children,
}: PropsWithChildren<ModalProps>) {
  return (
    <StyledModal $isShowing={isShowing}>
      <FlexContainer className="modal-content">
        {title && (
          <FlexChild className="modal-title">
            <Heading $level={1}>{title}</Heading>
          </FlexChild>
        )}
        <FlexChild className="modal-body">{children}</FlexChild>
      </FlexContainer>
      <div className="modal-overlay" onClick={handleClose}></div>
    </StyledModal>
  );
}
