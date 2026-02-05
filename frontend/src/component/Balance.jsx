
export const Balance = ({ value }) => {
    const displayValue = (() => {
        if (value == null) return "0.00";
        const numValue = parseFloat(value);
        return isNaN(numValue) ? "0.00" : numValue.toFixed(2);
    })();
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {displayValue}
        </div>
    </div>
}
