'use client';
import { IIndicatorProps } from '@/src/shared/types/molecules/indicator.type';
import React from 'react';
import styled from 'styled-components';

const IndicatorContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Step = styled.div`
    flex: 1;
    position: relative;
    text-align: center;
`;

const Circle = styled.div<{ active: boolean; completed: boolean }>`
    width: 18px;
    height: 18px;
    background-color: ${({ active, completed }) => (active || completed ? '#ffffffcc' : '#ffffff4c')};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ active, completed, theme}) => (active || completed ? theme.colors.textOrange : theme.colors.textWhite)};
    font-weight: bold;
    font-size: 10px;
    transition: background-color 0.3s;
    cursor: default;
`;

const Indicator: React.FC<IIndicatorProps> = ({ currentStep }) => {
    const totalSteps = 8;

    return (
        <IndicatorContainer>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <Step key={index}>
                    <Circle active={index === currentStep} completed={index < currentStep}>
                        {index + 1}
                    </Circle>
                </Step>
            ))}
        </IndicatorContainer>
    );
};

export default Indicator;
