import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyle,
} from './Searchbar.styled';
import { Notify } from 'notiflix';
import { paramsForNotify } from 'components/App';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = ({ currentTarget: { value } }) => {
    setSearchQuery(value.toLowerCase());
    // this.setState({ searchQuery: value.toLowerCase() });
  };

  const handleSubmit = e => {
    setSearchQuery(searchQuery.trim());
    // const searchQuery = this.state.searchQuery.trim();
    e.preventDefault();

    if (searchQuery === '') {
      Notify.info('Enter your request, please!', paramsForNotify);
      return;
    }

    // if (searchQuery === this.state.searchQuery) {
    //   Notify.info('Enter new request, please!', paramsForNotify);
    //   return;
    // }
    onSubmit(searchQuery);
    setSearchQuery('');
    // this.setState({ searchQuery: '' });
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton>
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
};
