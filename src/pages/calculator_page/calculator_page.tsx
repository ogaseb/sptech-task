import { Container } from '@mui/material';
import styled from 'styled-components';
import { Calculator } from '@components/calculator/calculator';

const StyledContainer = styled(Container)`
	width: 100vw;
	height: 100vh;
`;

const CalculatorPage = () => {
	return (
		<StyledContainer>
			<Calculator />
		</StyledContainer>
	);
};

export { CalculatorPage };
