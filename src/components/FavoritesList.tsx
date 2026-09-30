import type { GifData } from '../types';

interface FavoritesListProps {
  favorites: GifData[];
  onRemove: (id: string) => void;
}

function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) {
    return <p>No favorites yet. Go star some GIFs!</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Your Favorites</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {favorites.map((fav) => (
          <div key={fav.id}>
            <img
              src={fav.images.fixed_height.url}
              alt={fav.title || 'Favorited GIF'}
              style={{ maxWidth: '200px' }}
            />
            <br />
            <button onClick={() => onRemove(fav.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;