import { useState, useEffect } from "react";
import NewPost from "./NewPost";
import FilterPosts from "./FilterPosts";
import Post from "./Post";
import Page from "./Page";
import "./PostGrid.css";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const PostGrid = (props) => {
	let auth = localStorage.getItem("curAuth");
	let curPage = localStorage.getItem("curPage");

	let curPosts = [];
	let curComments = [];
	let [page, setPage] = useState(curPage);
	let [pagePosts, setPosts] = useState(curPosts);
	let [isLoading, setLoading] = useState(true);
	let [pageLoading, setPageLoading] = useState(true);
	let [pageComments, setComments] = useState(curComments);

	useEffect(() => {
		const fetchPost = async () => {
			await fetch(`${serverURL}articles/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
			})
				.then(async (response) => await response.json())
				.then((resData) => {
					let allArticles = resData.articles;
					let articles = [];
					for (let i = 0; i < allArticles.length; i++) {
						if (props.filterKey !== "") {
							if (
								allArticles[i].author.search(
									props.filterKey
								) !== -1 ||
								allArticles[i].content.search(
									props.filterKey
								) !== -1
							)
								articles.push(allArticles[i]);
						} else {
							articles.push(allArticles[i]);
						}
					}
					articles.sort((a, b) => (a.millis > b.millis ? -1 : 1));
					for (
						let i = 5 * (parseInt(page) - 1), count = 0;
						i < articles.length && count < 5;
						i++, count++
					) {
						curPosts.push(articles[i]);
					}
				})
				.then(() => {
					for (let i = 0; i < curPosts.length; i++) {
						curComments.push(curPosts[i].comment);
					}
					setLoading(false);
				})
				.then(() => {
					setPage(localStorage.getItem("curPage"));
					setPageLoading(false);
				});
		};
		fetchPost();
	});

	const displayPosts = async (pageNum) => {
		setLoading(true);
		// Hide divs
		let elements = document.getElementsByClassName("displayable");
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].style.display !== "none") {
				elements[i].style.display = "none";
			}
		}

		// Show posts in the other page
		let page = parseInt(localStorage.getItem("curPage"));
		let posts = [];
		let comments = [];

		const response = await fetch(`${serverURL}articles/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: auth,
			},
		});
		const resData = await response.json();
		let allArticles = resData.articles;
		let articles = [];
		for (let i = 0; i < allArticles.length; i++) {
			if (props.filterKey !== "") {
				if (
					allArticles[i].author.search(props.filterKey) !== -1 ||
					allArticles[i].content.search(props.filterKey) !== -1
				)
					articles.push(allArticles[i]);
			} else {
				articles.push(allArticles[i]);
			}
		}
		articles.sort((a, b) => (a.millis > b.millis ? -1 : 1));
		for (
			let i = 5 * (parseInt(page) - 1), count = 0;
			i < articles.length && count < 5;
			i++, count++
		) {
			posts.push(articles[i]);
			comments.push(articles[i].comment);
		}
		setPosts(posts);
		setComments(comments);
	};

	if (!isLoading && !pageLoading) {
		return (
			<div>
				<FilterPosts
					handleFilter={props.handleFilter}
					resumeFilter={props.resumeFilter}
				/>
				<div>
					<NewPost handlePost={props.handlePost} />
					<div id="postGridDiv">
						{pagePosts.map((post, idx) => {
							return (
								<Post
									key={idx}
									index={idx}
									pid={post.pid}
									author={post.author}
									avatar={post.avatar}
									date={post.date}
									title={post.title}
									body={post.content}
									image={post.image}
									comments={pageComments[idx]}
									editPost={props.editPost}
								/>
							);
						})}
					</div>
					<Page
						curPosts={props.curPosts}
						displayPosts={displayPosts}
					/>
				</div>
			</div>
		);
	}
};

export default PostGrid;
