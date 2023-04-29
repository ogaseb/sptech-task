import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { Box, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import {
	setSelectedYears,
	setServicesForSelectedYear,
} from '@stores/calculator_store/calculator_store';

const StyledYearsBox = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const YearsToggleComponent = () => {
	const dispatch = useAppDispatch();
	const { selectedYears, servicesForSelectedYear } = useAppSelector(
		(state) => state.calculatorStore,
	);

	const handleServiceYears = (
		_event: React.MouseEvent<HTMLElement>,
		newYears: string[],
	) => {
		const arrayCopy = [...servicesForSelectedYear];
		const newArray = newYears.map((year) => {
			//check if year is in arrayCopy and apply its values
			const index = arrayCopy.findIndex((item) => item.year === year);
			if (index !== -1) {
				return arrayCopy[index];
			} else {
				return {
					year: year,
					internet: false,
					tv: false,
					tel: false,
					decoder: false,
				};
			}
		});

		dispatch(setSelectedYears(newYears));
		dispatch(setServicesForSelectedYear(newArray));
	};

	return (
		<StyledYearsBox>
			<ToggleButtonGroup
				color="primary"
				value={selectedYears}
				onChange={handleServiceYears}
				aria-label="Platform"
			>
				<ToggleButton value="2023">2023</ToggleButton>
				<ToggleButton value="2024">2024</ToggleButton>
				<ToggleButton value="2025">2025</ToggleButton>
			</ToggleButtonGroup>
		</StyledYearsBox>
	);
};

export { YearsToggleComponent };
