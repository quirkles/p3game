"use client";

import { createGlobalStyle } from "styled-components";
import { getColor } from "@/styles/colors";

export const GlobalStyles = createGlobalStyle`

    :root {
        --background: ${getColor("yellow")};
        --foreground: ${getColor("black")};
    }
    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
    }

    body {
        
        color: var(--foreground);
        background: var(--background);
        font-family: Karla, Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 0;
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;

        .main {
            flex-grow: 1;
            align-self: center;
            width: 100%;
            margin-top: 1rem;
            @media (min-width: 768px) {
                width: 80%;
            }

            @media (min-width: 1024px) {
                max-width: 800px;
            }
        }
    }

    @media (prefers-color-scheme: dark) {
        html {
            color-scheme: dark;
        }
    }
`;
