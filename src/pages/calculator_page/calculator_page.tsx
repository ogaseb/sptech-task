import { useAppSelector } from '@hooks/hooks';
import { Box, Container, Paper, Typography, styled } from '@mui/material';
import { calculateCost } from '@utils/calculate_cost';
import { useMemo } from 'react';
import { ServicesCheckboxComponent } from '@components/calculator/services_checkbox/services_checkbox';
import { YearsToggleComponent } from '@components/calculator/years_toggle/years_toggle';
import { mediaQuery } from '@theme/theme';
import { sortBy } from 'lodash';

const StyledContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
`;

const StyledBox = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledServicesBox = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 100%;
`;

const StyledServicesPaper = styled(Paper)`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 60px;

	${mediaQuery('largeTablet')`
		flex-wrap: wrap;
		height: auto;
		flex-direction: column;
	`}
`;

const StyledServicesTypography = styled(Typography)`
	display: flex;
	align-items: center;
	padding-left: 32px;
	flex: 25%;

	${mediaQuery('largeTablet')`
		justify-content: center;
		flex:2;
		margin-top: 24px;
	`}
`;

const StyledCostPaper = styled(Paper)`
	&& {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		width: 100%;
		height: 32px;
	}
`;

const CalculatorPage = () => {
	const { servicesForSelectedYear } = useAppSelector(
		(state) => state.calculatorStore,
	);

	const cost = useMemo(() => {
		return calculateCost(servicesForSelectedYear) || 0;
	}, [servicesForSelectedYear]);

	return (
		<StyledContainer>
			<YearsToggleComponent />
			{servicesForSelectedYear.map((services) => (
				<StyledServicesBox key={services.year}>
					<StyledServicesPaper>
						<StyledServicesTypography>
							Usługi dla roku {services.year}:
						</StyledServicesTypography>
						<ServicesCheckboxComponent services={services} />
					</StyledServicesPaper>
				</StyledServicesBox>
			))}
			<StyledBox>
				{!!cost && (
					<StyledCostPaper>Suma wszystkich usług: {cost} zł</StyledCostPaper>
				)}
			</StyledBox>
		</StyledContainer>
	);
};

export { CalculatorPage };
