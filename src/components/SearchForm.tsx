import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void; 
  disabled: boolean;
}



function SearchForm({ onSearch, disabled }: SearchFormProps) {
  // This state holds whatever the user has typed so far.
  const [query, setQuery] = useState<string>('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();      
    if (!query.trim()) return;   
    onSearch(query);             
  }


  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <input
        type="text"
        value={query}                                  
        onChange={(e) => setQuery(e.target.value)}     
        placeholder="Search for a GIF…"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Search
      </button>
    </form>
  );
}

export default SearchForm;