import { useAppSelector } from '@hooks/hooks';
import { Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { ServicesCheckboxComponent } from '@components/calculator/services_checkbox/services_checkbox';
import { mediaQuery } from '@theme/theme';

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

const ServicesListForSelectedYears = () => {
	const { servicesForSelectedYear } = useAppSelector(
		(state) => state.calculatorStore,
	);

	return (
		<>
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
		</>
	);
};

export { ServicesListForSelectedYears };
