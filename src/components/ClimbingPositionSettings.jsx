const positions = [
  { value: 'left', label: 'LEFT SIDE', description: 'Climb by the left edge' },
  { value: 'center', label: 'CENTER', description: 'Climb the front center' },
  { value: 'right', label: 'RIGHT SIDE', description: 'Climb by the right edge' },
];

export default function ClimbingPositionSettings({ value, onChange, onClose }) {
  return (
    <section className="climbing-settings" aria-label="Game settings">
      <div className="climbing-settings__heading">
        <div>
          <span className="game-label">GAME SETTINGS</span>
          <h2>CLIMBING POSITION</h2>
        </div>
        {onClose && (
          <button
            className="settings-close"
            type="button"
            onClick={onClose}
            aria-label="Close settings"
          >
            ×
          </button>
        )}
      </div>
      <div className="position-options" role="group" aria-label="Climbing position">
        {positions.map((position) => (
          <button
            className={`position-option${value === position.value ? ' position-option--selected' : ''}`}
            type="button"
            aria-pressed={value === position.value}
            onClick={() => onChange(position.value)}
            key={position.value}
          >
            <span className={`position-preview position-preview--${position.value}`}>
              <span />
            </span>
            <span className="position-option__copy">
              <strong>{position.label}</strong>
              <small>{position.description}</small>
            </span>
            <span className="position-option__check" aria-hidden="true">
              {value === position.value ? '✓' : ''}
            </span>
          </button>
        ))}
      </div>
      <p className="settings-saved">SAVED ON THIS DEVICE</p>
    </section>
  );
}
