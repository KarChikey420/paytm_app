export function InputBox({label, placeholder, onChange}) {
    const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    return <div>
      <label htmlFor={inputId} className="text-sm font-medium text-left py-2 block">
        {label}
      </label>
      <input id={inputId} onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}