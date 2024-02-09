import { useState } from 'react';
import './Form.scss';
import { runUserQuery, runOrgQuery, runChangePage, Repo } from './api_logic';
import { ResultsTable } from './Results';

type SearchType = 'user' | 'org';
type SortBy = 'full_name' | 'created' | 'updated' | 'pushed';

export const ControlledForm = () => {
	const [name, setName] = useState('');
	const [searchType, setSearchType] = useState<SearchType>('user');
	const [isLoading, setIsLoading] = useState(false);
	const [repoResults, setRepoResults] = useState<Repo[]>([]);
	const [link, setLink] = useState('');
	const [sortBy, setSortBy] = useState<SortBy>('full_name');

	const onSubmit = async (link?: string) => {
		console.log('Searching for', name, 'as', searchType);
		setIsLoading(true);
		let result: Repo[] = [];
		let newLink = '';
		try {
			if (link) {
				[result, newLink] = await runChangePage(link);
			}
			else if (searchType === 'user') {
				[result, newLink] = await runUserQuery(name, sortBy);
			} else {
				[result, newLink] = await runOrgQuery(name, sortBy);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
			setRepoResults(result);
			setLink(newLink);
		}
	};
	const onRadioChange = (type: SearchType) => {
		setSearchType(type);
	};
	const onSortChange = (sort: SortBy) => {
		console.log('Sorting by', sort);
		setSortBy(sort);
	}
	// Submit form on enter key
	const onKeyPress = (event) => {
		if (event.key == 'Enter') {
			onSubmit();
		}
	};
	return (
		<>
			<div className='search'>
				<div id='formTypeSwitch'>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="flexRadioDefault" id="radioUser" checked={searchType === 'user'} onChange={() => onRadioChange('user')} />
						<label className="form-check-label" htmlFor="radioUser">
							User
						</label>
					</div>
					<div className="form-check">
						<input className="form-check-input" type="radio" name="flexRadioDefault" id="radioOrg" checked={searchType === 'org'} onChange={() => onRadioChange('org')} />
						<label className="form-check-label" htmlFor="radioOrg">
							Org
						</label>
					</div>
				</div>
				<label htmlFor="name">Search</label>	
				<input id="name" type="text" value={name} onChange={(e) => { 
					setName(e.target.value);
				}} onKeyPress={onKeyPress} />
				<button className="btn btn-primary" onClick={() => onSubmit()}>Submit</button>
				<SortDropdown onSelect={onSortChange} />
			</div>

			{isLoading && <div>{'Loading...'}</div>}
			{repoResults.length > 0 && !isLoading && (
				<ResultsTable results={repoResults} link={link} onSubmit={onSubmit} />
			)}
		</>
	);
};

const SortDropdown = ({onSelect}: {onSelect: (sort: SortBy) => void}) => {
	return (
		<div className="dropdown">
			<button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown">
				Sort By...
			</button>
			<ul className="dropdown-menu">
			<li className="dropdown-item" value="created" onClick={() => onSelect('full_name')}>{'Name (Default)'}</li>
				<li className="dropdown-item" value="created" onClick={() => onSelect('created')}>Created</li>
				<li className="dropdown-item" value="updated" onClick={() => onSelect('updated')}>Updated</li>
				<li className="dropdown-item" value="pushed" onClick={() => onSelect('pushed')}>Pushed</li>
			</ul>
		</div>
	);
}
