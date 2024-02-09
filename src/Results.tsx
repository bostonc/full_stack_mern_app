import { Repo } from './api_logic';
import './Results.scss';


type Props = {
	results: Repo[];
	link: string;
	onSubmit: (link?: string) => void;
};

export const ResultsTable = ({results, link, onSubmit}: Props) => {
	const parsedLink = link && parseLinkHeader(link);
	return (<>
		<table className="results">
			<thead>
				<tr>
					<th>Repository</th>
					<th>Created</th>
					<th>Updated</th>
					<th>Pushed</th>
				</tr>
			</thead>
			<tbody>
				{results.map((repo: Repo) => {
					return (
						<tr key={repo.id}>
							<td><a href={repo.html_url} target="_blank">{repo.full_name}</a></td>
							<td className="small">{repo.created_at}</td>
							<td className="small">{repo.updated_at}</td>
							<td className="small">{repo.pushed_at}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
		<div className="pagination">
			{link && Object.keys(parsedLink).map((key) => {
				return (
					<button className="btn btn-secondary" key={key} onClick={() => {
						onSubmit(parsedLink[key]);
					}}>
						{key}
					</button>
				);
			})}
		</div>
	</>);
};

function parseLinkHeader(header: string): KeyValueMap<string> {
    let parts: string[] = [];
    const links: KeyValueMap<string> = {};

    if (header.length === 0) {
        throw new Error('input must not be of zero length');
    }

    parts = header.split(',');
    // Parse each part into a named link
    parts.forEach(part => {
        const section: string[] = part.split(';');
        let url: string = '';
        let name: string = '';

        if (section.length !== 2) {
            throw new Error('section could not be split on \';\'');
        }
        url = section[0].replace(/<(.*)>/, '$1').trim();
        name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });

    return links;
}

interface KeyValueMap<T> {
    [key: string]: T;
}