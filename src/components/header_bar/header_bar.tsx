import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
	&& {
		height: 32px;

		.MuiToolbar-root {
			min-height: 32px;
			font-size: 14px;
		}
	}
`;

const HeaderBar = () => {
	return (
		<div>
			<StyledAppBar position="sticky">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
						}}
					>
						SP Tech Solutions task
					</Typography>
				</Toolbar>
			</StyledAppBar>
		</div>
	);
};

export { HeaderBar };
