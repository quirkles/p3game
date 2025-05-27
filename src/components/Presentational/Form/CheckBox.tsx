import styled from "styled-components";
import { useRef } from "react";
import { nanoid } from "nanoid";

const StyledCheckBox = styled.div`
  /* From Uiverse.io by SharpTH */
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    -webkit-perspective: 20px;
    perspective: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -12px;
    border: 2px solid #e8e8eb;
    background: #e8e8eb;
    border-radius: 4px;
    transform: translate3d(0, 0, 0);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #0b76ef;
  }

  .flip {
    display: block;
    transition: all 0.4s ease;
    transform-style: preserve-3d;
    position: relative;
    width: 20px;
    height: 20px;
  }

  input {
    display: none;
  }

  input:checked + .cbx {
    border-color: #0b76ef;
  }

  input:checked + .flip {
    transform: rotateY(180deg);
  }

  .front,
  .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 2px;
  }

  .front {
    background: #fff;
    z-index: 1;
  }

  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
    background: #0b76ef;
    text-align: center;
    color: #fff;
    line-height: 20px;
    box-shadow: 0 0 0 1px #0b76ef;
  }

  .back svg {
    fill: none;
  }

  .back svg path {
    stroke: #fff;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

interface ICheckBoxProps {
  isChecked: boolean;
  onChange(checked: boolean): void;
}

export function CheckBox({ isChecked, onChange }: ICheckBoxProps) {
  const inputId = useRef(`cb_${nanoid()}`);
  return (
    <StyledCheckBox>
      <label htmlFor={inputId.current}>
        <div className="checkmark">
          <input
            checked={isChecked}
            onChange={(ev) => onChange(ev.target.checked)}
            type="checkbox"
            id={inputId.current}
          />
          <div className="flip">
            <div className="front"></div>
            <div className="back">
              <svg viewBox="0 0 16 14" height="14" width="16">
                <path d="M2 8.5L6 12.5L14 1.5"></path>
              </svg>
            </div>
          </div>
        </div>
      </label>
    </StyledCheckBox>
  );
}
