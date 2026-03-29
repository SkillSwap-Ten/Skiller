import { ILoaderProps } from '@/src/shared/types/atoms/loader.type';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLoader = styled.div<{ $color: string }>`
    width: 16px;
    height: 16px;
    opacity: 0.8;
    border: 3px solid ${(props) => props.$color};
    border-top: 3px solid white;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

const Loader: React.FC<ILoaderProps> = ({ color }) => {
    return (
        <LoaderContainer>
            <StyledLoader $color={color} />
        </LoaderContainer>
    );
};

export default Loader;