import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";

const Page = (props) => {
	let curPage = parseInt(localStorage.getItem("curPage"));
	let [page, setPage] = useState(curPage);

	useEffect(() => {
		setPage(parseInt(localStorage.getItem("curPage")));
	}, [curPage]);

	const changePage = (event, pageNum) => {
		setPage(pageNum);
		localStorage.setItem("curPage", pageNum);
		props.displayPosts(pageNum);
	};

	return (
		<div>
			<Pagination
				id="pageination"
				count={Math.ceil(props.curPosts.length / 5)}
				page={page}
				defaultPage={1}
				variant="outlined"
				color="primary"
				onChange={changePage}
			/>
		</div>
	);
};

export default Page;
