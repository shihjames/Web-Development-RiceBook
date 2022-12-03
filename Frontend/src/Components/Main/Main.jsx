import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "./Grid";
import NavBar from "./Navbar";
const serverURL = "https://ricebook-final-js.herokuapp.com/";

const Main = () => {
	// let allUsers = localStorage.getItem("allusers");
	let curUser = localStorage.getItem("curUsername");
	let auth = localStorage.getItem("curAuth");

	// Initialize followings & posts
	let curFriends = [];
	let userPosts = [];
	let originalPosts = [];

	let [friends, setFriends] = useState(curFriends);
	let [isLoading, setLoading] = useState(true);
	let [curPosts, setPosts] = useState(userPosts);
	let [orgPosts, setOrgPosts] = useState(originalPosts);
	let [filterKey, setFilter] = useState("");

	// Fetch current user followings
	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${serverURL}following/${curUser}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: auth,
				},
			})
				.then(async (response) => await response.json())
				.then((resData) => {
					return [...resData.following];
				})
				.then(async (friends) => {
					for (let i = 0; i < friends.length; i++) {
						await fetch(`${serverURL}users/${friends[i]}`, {
							method: "GET",
							headers: { "Content-Type": "application/json" },
						})
							.then(async (response) => await response.json())
							.then((resData) => {
								curFriends.push(resData.userData);
							});
					}
				})
				.then(async () => {
					await fetch(`${serverURL}articles/`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: auth,
						},
					})
						.then(async (response) => await response.json())
						.then((resData) => {
							const articles = resData.articles;
							const length = articles.length;
							if (length > 0) {
								for (let i = 0; i < length; i++) {
									userPosts.push(articles[i]);
									originalPosts.push(articles[i]);
								}
							}
							setLoading(false);
						});
				});
		};
		fetchData();
	});

	// Add new friend
	const handleFriend = (newFriendInfo) => {
		let newFriends = [...friends];
		newFriends.push(newFriendInfo);
		setFriends(newFriends);
	};

	// Delete friend
	const deleteFriend = (deleteName) => {
		let friendList = [];
		for (let i = 0; i < friends.length; i++) {
			if (friends[i].username !== deleteName) {
				friendList.push(friends[i]);
			}
		}
		setFriends(friendList);
	};

	// Add new post
	const handlePost = (post) => {
		let newPosts = [...curPosts];
		let newOrgPosts = [...orgPosts];
		newPosts.unshift(post);
		newOrgPosts.unshift(post);
		setOrgPosts(newOrgPosts);
		setPosts(newPosts);
	};

	// Edit post content
	const editPost = (pid, newContent) => {
		let newPosts = [...curPosts];
		for (let i = 0; i < newPosts.length; i++) {
			if (newPosts[i].pid === pid) {
				newPosts[i].content = newContent;
				break;
			}
		}
		setPosts(newPosts);
		setOrgPosts(newPosts);
	};

	// Delete post when deleting a friend
	const deletePost = (username) => {
		let newPosts = [];
		for (let i = 0; i < curPosts.length; i++) {
			if (curPosts[i].author !== username) {
				newPosts.push(curPosts[i]);
			}
		}
		newPosts.sort((a, b) => (a.millis > b.millis ? -1 : 1));
		setPosts(newPosts);
		setOrgPosts(newPosts);
	};

	// Show new friend's posts
	const addNewFriendPosts = (newArticles) => {
		let newPosts = [...curPosts];
		let newOrgPosts = [...orgPosts];
		for (let i = 0; i < newArticles.length; i++) {
			newPosts.push(newArticles[i]);
			newOrgPosts.push(newArticles[i]);
		}
		setPosts(newPosts);
		setOrgPosts(newOrgPosts);
	};

	// Filter posts
	const handleFilter = (key) => {
		setLoading(true);
		setFilter(key);
	};

	// Resume to original posts
	const resumeFilter = () => {
		setLoading(true);
		setFilter("");
		setPosts(orgPosts);
	};

	if (!isLoading) {
		return (
			<div>
				<div>
					<NavBar />
				</div>
				<div>
					<Grid
						friends={friends}
						curPosts={curPosts}
						handlePost={handlePost}
						editPost={editPost}
						deletePost={deletePost}
						addNewFriendPosts={addNewFriendPosts}
						handleFilter={handleFilter}
						resumeFilter={resumeFilter}
						handleFriend={handleFriend}
						deleteFriend={deleteFriend}
						filterKey={filterKey}
					/>
				</div>
			</div>
		);
	}
};

export default Main;
