import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./NewPost.css";

const FilterPosts = (props) => {
	const handleFilter = () => {
		let key = document.getElementById("filterPost").value;
		if (key !== "") {
			props.handleFilter(key);
			document.getElementById("filterPost").value = "";
		}
	};

	const resumePosts = () => {
		props.resumeFilter();
	};

	return (
		<div>
			<div className="filterGrid">
				<div>
					<TextField
						multiline
						fullWidth
						id="filterPost"
						label="Filter Posts"
						placeholder="Search something"
						variant="standard"
					/>
					<IconButton title="Filter Articles" onClick={handleFilter}>
						<ManageSearchIcon />
					</IconButton>
					<IconButton
						title="Resume to original articles"
						onClick={() => {
							resumePosts();
							document.getElementById("filterPost").value = "";
						}}
					>
						<KeyboardReturnIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default FilterPosts;
