export default function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl bg-text-base/2 border border-text-base/5 ${disabled ? 'opacity-50' : ''
        }`}
    >
      <div>
        <div className="text-[12.5px] text-text-base/80 font-medium">{label}</div>
        <div className="text-[11px] text-text-base/30">{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 ml-3 w-9 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-[#9B8AFB]' : 'bg-text-base/8'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-4' : ''
            }`}
        />
      </button>
    </div>
  );
}
