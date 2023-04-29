import { useAppSelector } from '@hooks/hooks';
import { Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { calculateCost } from '@utils/calculate_cost';
import { useMemo } from 'react';
import { ServicesCheckboxComponent } from '@components/calculator/services_checkbox/services_checkbox';
import { YearsToggleComponent } from '@components/calculator/years_toggle/years_toggle';
import { mediaQuery } from '@theme/theme';

const CalculatorWrapper = styled.div`
	&& {
		margin-top: 120px;
	}
`;

const StyledBox = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
	padding-top: 16px;
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

const StyledYearsTypography = styled(Typography)`
	padding-bottom: 16px;
`;

const StyledCostPaper = styled(Paper)`
	&& {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		width: 50%;

		height: 32px;

		${mediaQuery('largeTablet')`
		  width: 100%;
	  `}
	}
`;

const Calculator = () => {
	const { servicesForSelectedYear } = useAppSelector(
		(state) => state.calculatorStore,
	);

	const cost = useMemo(() => {
		return calculateCost(servicesForSelectedYear) || 0;
	}, [servicesForSelectedYear]);

	return (
		<CalculatorWrapper>
			<StyledBox>
				<StyledYearsTypography>Wybierz lata usług:</StyledYearsTypography>
			</StyledBox>
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
		</CalculatorWrapper>
	);
};

export { Calculator };
