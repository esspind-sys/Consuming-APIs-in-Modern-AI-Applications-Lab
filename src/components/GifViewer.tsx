import type { GifData } from '../types';

// This interface satisfies the "TypeScript interfaces for component props" item.
interface GifViewerProps {
  gif: GifData;
}

function GifViewer({ gif }: GifViewerProps) {
  return (
    <figure>
      <img
        src={gif.images.original.url}
        alt={gif.title || 'A random GIF'}
        style={{ maxWidth: '100%' }}
      />
    </figure>
  );
}

export default GifViewer;