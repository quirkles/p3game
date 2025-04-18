import styled from 'styled-components';

export const Input = styled.input`
    padding: 12px 16px;
    font-size: 14px;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        border-color: #b3b3b3;
    }

    &:focus {
        border-color: #0077ff;
        box-shadow: 0 0 4px rgba(0, 119, 255, 0.5);
    }

    &:disabled {
        background-color: #f9f9f9;
        border-color: #e0e0e0;
        cursor: not-allowed;
        color: #a0a0a0;
    }
`;
