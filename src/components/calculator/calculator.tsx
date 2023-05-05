import { useAppSelector } from '@hooks/hooks';
import { Box, Paper, Typography } from '@mui/material';
import styled from 'styled-components';
import { calculateCost } from '@utils/calculate_cost';
import { useMemo } from 'react';
import { YearsToggleComponent } from '@components/calculator/years_toggle/years_toggle';
import { mediaQuery } from '@theme/theme';
import { ServicesListForSelectedYears } from './services_list_for_selected_years/services_list_for_selected_years';

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
      <ServicesListForSelectedYears />
      <StyledBox>
        {!!cost && (
          <StyledCostPaper>Suma wszystkich usług: {cost} zł</StyledCostPaper>
        )}
      </StyledBox>
    </CalculatorWrapper>
  );
};

export { Calculator };
