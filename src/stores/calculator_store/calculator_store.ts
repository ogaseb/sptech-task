import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sortBy } from 'lodash';

type CalculatorStoreState = {
	selectedYears: string[];
	servicesForSelectedYear: {
		year: string;
		internet: boolean;
		tv: boolean;
		tel: boolean;
		decoder: boolean;
	}[];
};

const initialState: CalculatorStoreState = {
	selectedYears: [],
	servicesForSelectedYear: [],
};

export const calculatorStore = createSlice({
	name: 'calculatorStore',
	initialState,
	reducers: {
		setSelectedYears: (state, action: PayloadAction<string[]>) => {
			state.selectedYears = action.payload;
		},
		setServicesForSelectedYear: (
			state,
			action: PayloadAction<CalculatorStoreState['servicesForSelectedYear']>,
		) => {
			state.servicesForSelectedYear = sortBy(action.payload, [
				(service) => service.year,
			]);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSelectedYears, setServicesForSelectedYear } =
	calculatorStore.actions;

export default calculatorStore.reducer;
