import styled from "styled-components";

export const Spinner = styled.div`
  /* HTML: <div class="loader"></div> */
  width: 70px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  &:before,
  &:after {
    content: "";
    grid-area: 1/1;
    animation: l2 3s infinite linear;
    background: #ff00ff;
    border-radius: 50%;
  }
  &:after {
    animation-delay: -0.8s;
  }
  @keyframes l2 {
    12.5% {
      border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%;
    }
    25% {
      border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%;
    }
    37.5% {
      border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%;
    }
    50% {
      border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%;
    }
    62.5% {
      border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%;
    }
    75% {
      border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%;
    }
    87.5% {
      border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%;
    }
  }
`;
