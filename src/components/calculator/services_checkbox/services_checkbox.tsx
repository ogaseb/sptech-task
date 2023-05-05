import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material';
import { setServicesForSelectedYear } from '@stores/calculator_store/calculator_store';
import { mediaQuery } from '@theme/theme';

const StyledServicesFormGroup = styled(FormGroup)`
  && {
    display: flex;
    flex: 75%;
    justify-content: center;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    justify-content: center;
    display: flex;

    ${mediaQuery('largeTablet')`
			flex: 50%;
		`}
  }
`;

const ServicesCheckboxComponent = ({
  services,
}: {
  services: {
    year: string;
    internet: boolean;
    tv: boolean;
    tel: boolean;
    decoder: boolean;
  };
}) => {
  const dispatch = useAppDispatch();
  const { servicesForSelectedYear } = useAppSelector(
    (state) => state.calculatorStore,
  );
  const serviceIndex = servicesForSelectedYear.findIndex(
    (item) => item.year === services.year,
  );

  const handleChange = (service: 'internet' | 'tv' | 'tel' | 'decoder') => {
    let servicesArray;

    //check if tv is deselected then uncheck decoder
    if (
      service === 'tv' &&
      servicesForSelectedYear[serviceIndex][service] === true
    ) {
      servicesArray = {
        ...servicesForSelectedYear[serviceIndex],
        decoder: false,
        [service]: !servicesForSelectedYear[serviceIndex][service],
      };
    } else {
      servicesArray = {
        ...servicesForSelectedYear[serviceIndex],
        [service]: !servicesForSelectedYear[serviceIndex][service],
      };
    }

    const newServicesForSelectedYear = [
      ...servicesForSelectedYear.slice(0, serviceIndex),
      servicesArray,
      ...servicesForSelectedYear.slice(serviceIndex + 1),
    ];

    dispatch(setServicesForSelectedYear(newServicesForSelectedYear));
  };

  const labelArray: Record<string, string> = {
    internet: 'Internet',
    tv: 'Telewizja',
    tel: 'Telefon',
    decoder: 'Dekoder 4K',
  };

  return (
    <StyledServicesFormGroup>
      {Object.entries(services)
        .filter(([key]) => key !== 'year')
        .map(([key, value]: any) => (
          <StyledFormControlLabel
            key={key}
            control={
              <Checkbox
                disabled={
                  key === 'decoder' && !servicesForSelectedYear[serviceIndex].tv
                }
                checked={value}
                onChange={() => handleChange(key)}
              />
            }
            label={labelArray[key]}
          />
        ))}
    </StyledServicesFormGroup>
  );
};

export { ServicesCheckboxComponent };
