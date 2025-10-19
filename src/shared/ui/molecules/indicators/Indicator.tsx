'use client';
import { IIndicatorProps } from '@/src/shared/types/molecules/indicator.type';
import React from 'react';
import styled from 'styled-components';

const IndicatorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const Step = styled.div`
    flex: 1;
    position: relative;
    text-align: center;
`;

const Circle = styled.div<{ active: boolean; completed: boolean }>`
    width: 17px;
    height: 17px;
    background-color: ${({ active, completed }) => (active || completed ? '#ffffffcc' : '#ffffff4c')};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.textOrange};
    font-weight: bold;
    font-size: 10px;
    transition: background-color 0.3s;
`;

const Indicator: React.FC<IIndicatorProps> = ({ currentStep }) => {
    const totalSteps = 7;

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
