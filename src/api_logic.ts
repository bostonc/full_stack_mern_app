import { request } from "@octokit/request";
import { SortBy } from "./Form";

type Owner = {
	avatar_url: string;
	html_url: string;
	id: number;
	login: string;
	node_id: string;
	organizations_url: string;
	type: string;
	url: string;
}

interface Repo {
allow_forking: boolean;
archive_url: string;
archived: boolean
contributors_url: string;
created_at: string;
default_branch: string
deployments_url: string;
description: string;
disabled: boolean;
full_name: string;
git_url: string;
homepage: string;
html_url: string;
id: number;
node_id: string;
owner: Owner;
private: boolean;
pushed_at: string;
size: number;
stargazers_count: number;
updated_at: string;
visibility: string;
watchers: number;
watchers_count: number;
}

type GitHubResponse = {
	data: Repo[];
	headers: {
		link: string;
	};
	status: number;
}

export const runUserQuery = async (search: string, sort?: SortBy) => {
	const result: GitHubResponse = await request('GET /users/{username}/repos', {
		username: search,
		per_page: 15,
		sort: sort,
	}).catch(() => {
		console.log("Couldn't find user.");
		alert("No Results!");
	});
	console.log(result);
	return [result?.data ?? [], result.headers.link];
}

export const runOrgQuery = async (search: string, sort?: SortBy) => {
	const result: GitHubResponse = await request("GET /orgs/{org}/repos", {
		org: search,
		per_page: 15,
		sort: sort,
	}).catch(() => {
		console.log("Couldn't find org.");
		alert("No Results!");
	});
	console.log(result);
	return [result?.data ?? [], result.headers.link];
}

export const runChangePage = async (link: string) => {
	const result: GitHubResponse = await request(`GET ${link}`).catch(() => {
		console.log("Couldn't find page.");
		alert("No Results!");
	});
	console.log(result);
	return [result?.data ?? [], result.headers.link];
}