interface NewGifButtonProps {
  onClick: () => void; // a function that takes nothing and returns nothing
  disabled: boolean;
}

function NewGifButton({ onClick, disabled }: NewGifButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {disabled ? 'Loading…' : 'New GIF'}
    </button>
  );
}

export default NewGifButton;