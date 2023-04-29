import { HeaderBar } from '@components/header_bar/header_bar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: calc(100vh - 32px);
	overflow: auto;
`;

const RootPage = () => {
	return (
		<>
			<HeaderBar />
			<StyledWrapper>
				<Outlet />
			</StyledWrapper>
		</>
	);
};

export { RootPage };
